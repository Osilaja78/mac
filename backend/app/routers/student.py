import os, json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import joinedload
from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from app.utils.database import get_db
from app.utils.models import Student, ReportCard, ReadingMaterial
from app.utils.schemas import StudentCreate, Token, StudentProfile, SubjectScoreResponse, ReportCardResponse
from app.utils.token import create_access_token
from app.utils.email import send_mail
from dotenv import load_dotenv

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

load_dotenv()

# JWT settings
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')

router = APIRouter(tags=["Students"])

def generate_admission_number(db: Session) -> str:
    """Generate a unique admission number based on year and sequential number"""
    current_year = datetime.now().year
    # Get the count of students admitted this year
    year_prefix = str(current_year)[-2:]  # Last two digits of year
    
    # Query to get the last admission number for this year
    last_student = db.query(Student).filter(
        Student.admission_number.like(f"MAS{year_prefix}%")
    ).order_by(Student.admission_number.desc()).first()
    
    if last_student:
        last_number = int(last_student.admission_number[-3:])
        new_number = str(last_number + 1).zfill(3)
    else:
        new_number = "001"
    
    return f"MAS{year_prefix}{new_number}"


@router.post("/students/signup", response_model=dict)
async def student_signup(student: StudentCreate, db: Session = Depends(get_db)):
    # Generate admission number
    admission_number = generate_admission_number(db)
    
    # Hash the password
    hashed_password = pwd_context.hash(student.password)
    
    # Create new student
    db_student = Student(
        full_name=student.full_name,
        admission_number=admission_number,
        current_class=student.current_class,
        gender=student.gender,
        date_of_birth=student.date_of_birth,
        guardian_name=student.guardian_name,
        guardian_phone=student.guardian_phone,
        guardian_email=student.guardian_email,
        hashed_password=hashed_password,
        date_admitted=datetime.now().date(),
        is_active=True,
        state_of_origin=student.state_of_origin,
        local_government=student.local_government,
    )
    
    try:
        db.add(db_student)
        db.commit()
        db.refresh(db_student)

        # Email content for successfule registration
        content = f"""
            <html>
            <body>
                <b>Hi, {student.full_name}</b></br>
                <p>
                    Welcome to <b>Mother's Aid Schools</b> portal, where you can find and manage anything
                    related to your academics.
                </p>
                <p>
                    Your admission number is <b>{admission_number}</b>, and you can use it to login to your portal.
                </p>
                <p>
                    Now that you're registered, you can go ahead and login to have access to your portal.
                </p>
            </body>
            </html>
        """

        await send_mail(email=student.guardian_email, content=content)

        return {
            "message": "Student registered successfully",
            "admission_number": admission_number
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating student account"
        )


@router.post("/students/login", response_model=Token)
def student_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Find student by admission number
    student = db.query(Student).filter(
        Student.admission_number == form_data.username
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admission number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify password
    if not pwd_context.verify(form_data.password, student.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admission number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": student.admission_number}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


async def get_current_student(
    token: str = Depends(OAuth2PasswordBearer(tokenUrl="students/login")),
    db: Session = Depends(get_db)
) -> Student:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        admission_number: str = payload.get("sub")
        if admission_number is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    student = db.query(Student).filter(Student.admission_number == admission_number).first()
    if student is None:
        raise credentials_exception
    return student

from sqlalchemy.orm import class_mapper

def serialize_model(model):
    """Transforms a SQL Alchemy model instance into a dictionary"""
    # Get all the model's columns
    columns = [c.key for c in class_mapper(model.__class__).columns]
    # Return a dict where the keys are the columns and the values are the model's values
    return {c: getattr(model, c) for c in columns}

@router.get("/students/me", response_model=StudentProfile)
async def get_profile(
    current_student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    student = db.query(Student).options(
        joinedload(Student.report_cards)
    ).filter(
        Student.admission_number == current_student.admission_number
    ).first()
    
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found"
        )

    return student


@router.get("/students/academic-records", response_model=List[ReportCardResponse])
async def get_academic_records(
    current_student: Student = Depends(get_current_student),
    db: Session = Depends(get_db),
    term: Optional[str] = None,
    session: Optional[str] = None
):
    # Build the query
    query = db.query(ReportCard).filter(ReportCard.student_id == current_student.admission_number)
    
    # Add optional filters
    if term:
        query = query.filter(ReportCard.term == term)
    if session:
        query = query.filter(ReportCard.session == session)
    
    # Get report cards ordered by session and term
    report_cards = query.order_by(
        ReportCard.session.desc(),
        ReportCard.term.desc()
    ).all()
    
    if not report_cards:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No academic records found"
        )
    
    return report_cards


@router.get("/students/reading-materials")
async def get_reading_materials(
    current_student: Student = Depends(get_current_student),
    db: Session = Depends(get_db)
):
    materials = db.query(ReadingMaterial).filter(
        ReadingMaterial.class_assigned == current_student.current_class,
        ReadingMaterial.is_active == True
    ).all()
    
    return {
        "reading_materials": [
            {
                "title": material.title,
                "description": material.description,
                "subject": material.subject,
                "file_url": material.file_url,
                "upload_date": material.upload_date,
                "term": material.term,
                "session": material.session
            }
            for material in materials
        ]
    }
