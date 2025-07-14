from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import StreamingResponse
from jose import JWTError, jwt
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, or_
from typing import List, Optional
from datetime import datetime
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from app.utils.database import get_db
from app.utils.models import Admin, Student, ReportCard, SubjectScore, TeacherComment, ReadingMaterial, News
from app.utils.schemas import StudentResponse, StudentUpdate, DashboardInfo, ReportCardResponse, NewsResponse
from app.utils.token import create_access_token
from dotenv import load_dotenv
from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import os, uuid


# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

load_dotenv()

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

router = APIRouter(tags=["Admin"])

# Pydantic models for request validation
class AdminCreate(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    password: str
    role: str

class SubjectScoreCreate(BaseModel):
    subject_name: str
    ca_score: int
    exam_score: int
    grade: str
    teacher_remark: str

class TeacherCommentCreate(BaseModel):
    comment_type: str
    comment: str

class ReportCardCreate(BaseModel):
    admission_number: str
    term: str
    session: str
    class_name: str
    position_in_class: int
    total_students: int
    attendance: int
    teacher_name: str
    principal_name: str
    teacher_remark: str
    principal_remark: str
    first_term_average: Optional[float] = None
    subjects: List[SubjectScoreCreate]
    comments: List[TeacherCommentCreate]

class ReadingMaterialCreate(BaseModel):
    title: str
    description: str
    subject: str
    class_assigned: str
    term: str
    session: str


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/token")

async def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Admin:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        role: str = payload.get("role")
        if role is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    admin = db.query(Admin).filter(Admin.username == username).first()
    if admin is None:
        raise credentials_exception
    return admin


@router.post("/admin/token")
async def admin_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Find admin by username
    admin = db.query(Admin).filter(Admin.username == form_data.username).first()
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not pwd_context.verify(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Generate token
    access_token = create_access_token(
        data={"sub": admin.username, "role": admin.role}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": admin.role,
        "username": admin.username
    }


@router.post("/admin/register", response_model=dict)
async def register_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    # Check if username or email already exists
    existing_admin = db.query(Admin).filter(
        (Admin.username == admin.username) | (Admin.email == admin.email)
    ).first()
    
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )
    
    # Create new admin
    db_admin = Admin(
        username=admin.username,
        email=admin.email,
        full_name=admin.full_name,
        hashed_password=pwd_context.hash(admin.password),
        role=admin.role,
        is_active=True
    )
    
    try:
        db.add(db_admin)
        db.commit()
        db.refresh(db_admin)
        return {"message": "Admin registered successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.post("/admin/report-cards", response_model=dict)
async def create_report_card(
    report_card: ReportCardCreate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    # Verify student exists
    student = db.query(Student).filter(Student.admission_number == report_card.admission_number).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )
    
    # Create report card
    db_report_card = ReportCard(
        id=str(uuid.uuid4()),
        student_id=report_card.admission_number,
        term=report_card.term,
        session=report_card.session,
        class_name=report_card.class_name,
        position_in_class=report_card.position_in_class,
        total_students=report_card.total_students,
        attendance=report_card.attendance,
        teacher_name=report_card.teacher_name,
        principal_name=report_card.principal_name,
        teacher_remark=report_card.teacher_remark,
        principal_remark=report_card.principal_remark,
        first_term_average=report_card.first_term_average,
        date_generated=datetime.now().date()
    )
    
    try:
        db.add(db_report_card)
        db.commit()
        db.refresh(db_report_card)
        
        # Add subject scores
        for subject in report_card.subjects:
            db_subject = SubjectScore(
                report_card_id=db_report_card.id,
                subject_name=subject.subject_name,
                ca_score=subject.ca_score,
                exam_score=subject.exam_score,
                total_score=subject.ca_score + subject.exam_score,
                grade=subject.grade,
                teacher_remark=subject.teacher_remark
            )
            db.add(db_subject)
        
        # Add teacher comments
        for comment in report_card.comments:
            db_comment = TeacherComment(
                report_card_id=db_report_card.id,
                comment_type=comment.comment_type,
                comment=comment.comment
            )
            db.add(db_comment)
        
        db.commit()
        return {"message": "Report card created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/admin/report-cards", response_model=List[ReportCardResponse])
async def get_all_report_cards(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    try:
        report_cards = db.query(ReportCard)\
            .options(joinedload(ReportCard.subjects))\
            .order_by(ReportCard.date_generated.desc())\
            .all()

        return report_cards
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/admin/report-cards/{report_id}/download")
async def download_report_card(
    report_id: int,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    report_card = db.query(ReportCard)\
        .options(joinedload(ReportCard.subjects))\
        .filter(ReportCard.id == report_id)\
        .first()
    
    if not report_card:
        raise HTTPException(status_code=404, detail="Report card not found")
    
    student = db.query(Student).filter(Student.admission_number == report_card.student_id).first()
    
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=20, leftMargin=20, topMargin=20, bottomMargin=20)
    styles = getSampleStyleSheet()
    elements = []

    # SCHOOL HEADER
    logo_path = "logo-bg.jpeg"  # Make sure the logo file exist
    logo = Image(logo_path, width=60, height=60)
    school_name = Paragraph("""<b>MOTHER'S AID COLLEGE</b><br/><font size=10>(A DIVISION OF NASURULLAH)</font><br/><font size=8>Morals Achieving Intellectual and Personal Excellence</font>""", styles['Title'])
    header_table = Table([[logo, school_name]], colWidths=[70, 400])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (1, 0), (1, 0), 10),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 12))
    elements.append(Paragraph("<b>OFFICIAL ACADEMIC RESULT</b>", styles['Heading2']))

    # Calculate student's age
    today = datetime.now().date()
    age = today.year - student.date_of_birth.year - (
        (today.month, today.day) < (student.date_of_birth.month, student.date_of_birth.day)
    )

    # STUDENT INFO TABLE
    student_info = [
        ['NAME', student.full_name, 'GENDER', student.gender],
        ['CLASS', report_card.class_name, 'SESSION', report_card.session],
        ['D.O.B', student.date_of_birth, 'AGE', str(age)],
        ['TERM', report_card.term, 'ADMISSION NO.', student.admission_number],
    ]
    student_table = Table(student_info, colWidths=[60, 150, 60, 150])
    student_table.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 0.25, colors.black),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BACKGROUND', (0, 0), (-1, 0), colors.lightgrey)
    ]))
    elements.append(student_table)
    elements.append(Spacer(1, 10))

    # SUBJECT SCORES TABLE (COGNITIVE DOMAIN)
    subject_data = [['SUBJECTS', 'C.A', 'EXAM', 'TOTAL', 'GRADE', 'POSITION', 'REMARKS']]
    for subject in report_card.subjects:
        subject_data.append([
            subject.subject_name,
            subject.ca_score,
            subject.exam_score,
            subject.total_score,
            subject.grade,
            report_card.position_in_class,
            subject.teacher_remark
        ])
    subject_table = Table(subject_data, colWidths=[100, 40, 40, 40, 50, 50, 130])
    subject_table.setStyle(TableStyle([
        ('GRID', (0, 0), (-1, -1), 0.5, colors.black),
        ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('ALIGN', (1, 1), (-2, -1), 'CENTER')
    ]))
    elements.append(subject_table)
    elements.append(Spacer(1, 12))

    # Calculate average score from all subjects
    total_score = 0
    total_subjects = len(report_card.subjects)
    
    if total_subjects > 0:
        for subject in report_card.subjects:
            total_score += subject.total_score
        average_score = round((total_score / (total_subjects * 100)) * 100, 2)
    else:
        average_score = 0

    # AVERAGE & COMMENTS
    summary_data = [
        ["FIRST TERM %:", f"{report_card.first_term_average}", "SECOND TERM:", f"{average_score}%"],
        ["POSITION IN CLASS:", f"{report_card.position_in_class}/{report_card.total_students}", "", ""]
    ]
    summary_table = Table(summary_data, colWidths=[100, 80, 100, 80])
    summary_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
    ]))
    elements.append(summary_table)
    elements.append(Spacer(1, 10))

    # REMARKS
    elements.append(Paragraph(f"Teacher's Remark: {report_card.teacher_remark}", styles['Normal']))
    elements.append(Paragraph(f"Principal's Remark: {report_card.principal_remark}", styles['Normal']))
    elements.append(Spacer(1, 10))

    # SIGNATURES
    elements.append(Paragraph(f"TEACHER'S NAME: {report_card.teacher_name}", styles['Normal']))
    elements.append(Paragraph(f"PRINCIPAL'S NAME: {report_card.principal_name}", styles['Normal']))

    doc.build(elements)
    buffer.seek(0)
    
    return StreamingResponse(
        buffer,
        media_type='application/pdf',
        headers={
            'Content-Disposition': f'attachment; filename="report_card_{report_card.student_id}.pdf"'
        }
    )


@router.post("/admin/reading-materials", response_model=dict)
async def create_reading_material(
    title: str = Form(...),
    description: str = Form(...),
    subject: str = Form(...),
    class_assigned: str = Form(...),
    term: str = Form(...),
    session: str = Form(...),
    file: UploadFile = File(...),
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    # Validate file type
    allowed_types = ["application/pdf", "application/msword", 
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "application/vnd.ms-powerpoint",
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation"]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File type not allowed. Please upload PDF, DOC, DOCX, PPT, or PPTX files only."
        )

    try:
        # Read file content
        file_content = await file.read()
        
        # Create reading material
        db_material = ReadingMaterial(
            id=str(uuid.uuid4()),
            title=title,
            description=description,
            file_content=file_content,
            file_type=file.content_type,
            file_name=file.filename,
            subject=subject,
            class_assigned=class_assigned,
            term=term,
            session=session,
            uploaded_by=current_admin.id
        )
        
        db.add(db_material)
        db.commit()
        db.refresh(db_material)
        
        return {"message": "Reading material created successfully"}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/reading-materials/{material_id}/download")
async def download_material(
    material_id: int,
    db: Session = Depends(get_db)
):
    material = db.query(ReadingMaterial).filter(ReadingMaterial.id == material_id).first()
    if not material:
        raise HTTPException(status_code=404, detail="Material not found")
    
    return StreamingResponse(
        BytesIO(material.file_content),
        media_type=material.file_type,
        headers={
            'Content-Disposition': f'attachment; filename="{material.file_name}"'
        }
    )

@router.get("/admin/students-info", response_model=DashboardInfo)
async def get_all_dashboard_info(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    try:
        # Get total counts using aggregation
        total_students = db.query(func.count(Student.admission_number)).scalar()
        print(total_students)
        total_report_cards = db.query(func.count(ReportCard.id)).scalar()
        total_materials = db.query(func.count(ReadingMaterial.id)).scalar()
        total_news = db.query(func.count(News.id)).scalar()

        # Get recent materials (last 5)
        recent_materials = db.query(ReadingMaterial)\
            .order_by(ReadingMaterial.upload_date.desc())\
            .limit(5)\
            .all()

        return {
            "total_students": total_students,
            "total_report_cards": total_report_cards,
            "total_materials": total_materials,
            "total_news": total_news,
            "recent_materials": recent_materials
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching dashboard information: {str(e)}"
        )


@router.post("/admin/news", response_model=dict)
async def create_news(
    title: str = Form(...),
    content: str = Form(...),
    cover_image: UploadFile = File(...),
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    # Validate image type
    allowed_types = ['image/jpeg', 'image/png', 'image/gif']
    file_extension = cover_image.filename.lower().split('.')[-1]
    allowed_extensions = ['jpg', 'jpeg', 'png', 'gif']

    if (cover_image.content_type not in allowed_types or 
        file_extension not in allowed_extensions):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image format. Please upload JPEG, PNG or GIF"
        )

    try:
        # Read image content
        image_content = await cover_image.read()
        
        # Create news
        db_news = News(
            title=title,
            content=content,
            cover_image=image_content,
            image_type=cover_image.content_type,
            uploaded_by=current_admin.id
        )
        
        db.add(db_news)
        db.commit()
        db.refresh(db_news)
        
        return {"message": "News created successfully", "id": db_news.id}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/admin/news", response_model=List[NewsResponse])
async def get_all_news(
    db: Session = Depends(get_db)
):
    try:
        news_items = db.query(News)\
            .order_by(News.date_uploaded.desc())\
            .all()

        # Add image URL to each news item
        for news in news_items:
            news.image_url = f"/admin/news/{news.id}/image"

        return news_items
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/admin/news/{news_id}/image")
async def get_news_image(
    news_id: str,
    db: Session = Depends(get_db)
):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    return StreamingResponse(
        BytesIO(news.cover_image),
        media_type=news.image_type
    )

@router.delete("/admin/news/{news_id}", response_model=dict)
async def delete_news(
    news_id: str,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    try:
        db.delete(news)
        db.commit()
        return {"message": "News deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/admin/news/{news_id}")
async def update_news(
    news_id: str,
    title: str = Form(...),
    content: str = Form(...),
    cover_image: UploadFile = File(None),
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    
    try:
        # Update text fields
        news.title = title
        news.content = content
        
        # Update image if provided
        if cover_image:
            allowed_types = ['image/jpeg', 'image/png', 'image/gif']
            file_extension = cover_image.filename.lower().split('.')[-1]
            allowed_extensions = ['jpg', 'jpeg', 'png', 'gif']
            
            if (cover_image.content_type not in allowed_types or 
                file_extension not in allowed_extensions):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid image format. Please upload JPEG, PNG or GIF"
                )

            image_content = await cover_image.read()
            news.cover_image = image_content
            news.image_type = cover_image.content_type
        
        db.commit()
        db.refresh(news)

        return { "message": "News updated successfully!" }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/admin/students", response_model=List[StudentResponse])
async def get_all_students(
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db),
    search: Optional[str] = None,
    current_class: Optional[str] = None,
    is_active: Optional[bool] = None
):
    try:
        query = db.query(Student)

        # Apply filters if provided
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Student.full_name.ilike(search_term),
                    Student.admission_number.ilike(search_term)
                )
            )
        
        if current_class:
            query = query.filter(Student.current_class == current_class)
        
        if is_active is not None:
            query = query.filter(Student.is_active == is_active)

        # Order by admission date
        students = query.order_by(Student.date_admitted.desc()).all()
        
        return students
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.put("/admin/students/{admission_number}", response_model=StudentResponse)
async def update_student(
    admission_number: str,
    student_update: StudentUpdate,
    current_admin: Admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    # Find student
    student = db.query(Student).filter(Student.admission_number == admission_number).first()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )

    try:
        # Update student fields if provided
        update_data = student_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(student, field, value)

        db.commit()
        db.refresh(student)
        
        return student
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
