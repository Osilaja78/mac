from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, datetime

class StudentCreate(BaseModel):
    full_name: str
    gender: str
    date_of_birth: date
    guardian_name: str
    guardian_phone: str
    guardian_email: str
    current_class: str
    password: str
    state_of_origin: str
    local_government: str

class Token(BaseModel):
    access_token: str
    token_type: str

class SubjectScoreResponse(BaseModel):
    subject_name: str
    ca_score: int
    exam_score: int
    total_score: int
    grade: str
    teacher_remark: str

    class Config:
        from_attributes = True

class ReportCardResponse(BaseModel):
    id: str
    term: str
    session: str
    class_name: str
    student_id: str
    position_in_class: int
    total_students: int
    attendance: int
    date_generated: date
    teacher_name: Optional[str] = None
    principal_name: Optional[str] = None
    teacher_remark: Optional[str] = None
    principal_remark: Optional[str] = None
    # first_term_average: Optional[float] = None
    subjects: List[SubjectScoreResponse]

    class Config:
        from_attributes = True

class StudentProfile(BaseModel):
    full_name: str
    admission_number: str
    current_class: str
    gender: str
    date_of_birth: date
    guardian_name: str
    guardian_phone: str
    guardian_email: str
    is_active: bool
    date_admitted: date
    state_of_origin: str
    local_government: str
    report_cards: List[ReportCardResponse] = []

    class Config:
        from_attributes = True


class ReadingMaterialInfo(BaseModel):
    id: str
    title: str
    subject: str
    class_assigned: str
    upload_date: datetime
    term: str
    session: str
    file_name: str

class DashboardInfo(BaseModel):
    total_students: int
    total_report_cards: int
    total_materials: int
    total_news: int
    recent_materials: List[ReadingMaterialInfo]

    class Config:
        from_attributes = True

class NewsResponse(BaseModel):
    id: str
    title: str
    content: str
    date_uploaded: datetime
    image_url: str

    class Config:
        from_attributes = True

class StudentResponse(BaseModel):
    full_name: str
    admission_number: str
    current_class: str
    gender: str
    date_of_birth: date
    guardian_name: str
    guardian_phone: str
    guardian_email: str
    is_active: bool
    date_admitted: date
    state_of_origin: str
    local_government: str

    class Config:
        from_attributes = True

class AdminResponse(BaseModel):
    full_name: str
    username: str
    email: str
    role: str
    is_active: bool

    class Config:
        from_attributes = True

class StudentUpdate(BaseModel):
    full_name: str
    admission_number: str
    current_class: str
    gender: str
    date_of_birth: date
    guardian_name: str
    guardian_phone: str
    guardian_email: str
    is_active: bool
    date_admitted: date
    state_of_origin: str
    local_government: str
