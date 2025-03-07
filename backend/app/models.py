from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    student_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    program = Column(String)
    hashed_password = Column(String)

    academic_records = relationship("AcademicRecord", back_populates="student")

class AcademicRecord(Base):
    __tablename__ = "academic_records"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    courses = Column(String)
    grades = Column(String)
    attendance = Column(Integer)

    student = relationship("Student", back_populates="academic_records")
