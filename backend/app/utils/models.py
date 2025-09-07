from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean, Text, DateTime, LargeBinary, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from datetime import UTC
from app.utils.database import Base
import uuid

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, index=True)
    full_name = Column(String, index=True)
    admission_number = Column(String, primary_key=True, unique=True, index=True)
    current_class = Column(String, index=True)  # e.g. "JSS1", "SSS3"
    next_class = Column(String)
    gender = Column(String)
    date_of_birth = Column(Date)
    guardian_name = Column(String)
    guardian_phone = Column(String)
    guardian_email = Column(String)
    is_active = Column(Boolean, default=True)
    date_admitted = Column(Date)
    hashed_password = Column(String)
    profile_image_url = Column(String, nullable=True)
    profile_image = Column(LargeBinary, nullable=True)
    image_type = Column(String, nullable=True)
    state_of_origin = Column(String)
    local_government = Column(String)

    report_cards = relationship("ReportCard", back_populates="student")

class ReportCard(Base):
    __tablename__ = "report_cards"

    id = Column(String(80), primary_key=True, index=True)
    student_id = Column(String, ForeignKey("students.admission_number"))
    term = Column(String)  # First, Second, Third
    session = Column(String)  # e.g. "2023/2024"
    class_name = Column(String)  # e.g. "JSS1", "SSS3"
    position_in_class = Column(Integer, nullable=True)
    total_students = Column(Integer, nullable=True)
    attendance = Column(Integer)
    date_generated = Column(Date)

    teacher_name = Column(String, nullable=True)
    principal_name = Column(String, nullable=True)
    teacher_remark = Column(Text, nullable=True)
    principal_remark = Column(Text, nullable=True)
    
    student = relationship("Student", back_populates="report_cards")
    subjects = relationship("SubjectScore", back_populates="report_card")
    comments = relationship("TeacherComment", back_populates="report_card")

class SubjectScore(Base):
    __tablename__ = "subject_scores"

    id = Column(String(80), primary_key=True, index=True)
    report_card_id = Column(String, ForeignKey("report_cards.id"))
    subject_name = Column(String)
    ca_score = Column(Integer)  # Continuous Assessment
    exam_score = Column(Integer)
    total_score = Column(Integer)
    grade = Column(String)
    teacher_remark = Column(String)

    report_card = relationship("ReportCard", back_populates="subjects")

class TeacherComment(Base):
    __tablename__ = "teacher_comments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    report_card_id = Column(String, ForeignKey("report_cards.id"))
    comment_type = Column(String)  # "Class Teacher", "Principal"
    comment = Column(Text)

    report_card = relationship("ReportCard", back_populates="comments")

class ReadingMaterial(Base):
    __tablename__ = "reading_materials"

    id = Column(String, default=str(uuid.uuid4()), primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    file_content = Column(LargeBinary)  # Store file as binary
    file_type = Column(String)  # Store content type
    file_name = Column(String)
    subject = Column(String)
    class_assigned = Column(String)  # e.g. "JSS1", "SSS3"
    upload_date = Column(DateTime, default=datetime.now(tz=UTC))
    term = Column(String)
    session = Column(String)
    is_active = Column(Boolean, default=True)
    uploaded_by = Column(Integer, ForeignKey("admin.id"))

    admin = relationship("Admin", back_populates="uploaded_materials")

class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    role = Column(String)  # "admin", "teacher", "principal"
    is_active = Column(Boolean, default=True)

    uploaded_materials = relationship("ReadingMaterial", back_populates="admin")

class News(Base):
    __tablename__ = "news"

    id = Column(String, default=str(uuid.uuid4()), primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    cover_image = Column(LargeBinary)  # Store image as binary
    image_type = Column(String)  # Store image mime type
    date_uploaded = Column(DateTime, default=datetime.now)
    uploaded_by = Column(Integer, ForeignKey("admin.id"))
