from pydantic import BaseModel, EmailStr

class StudentBase(BaseModel):
    full_name: str
    student_id: str
    email: EmailStr
    program: str

class StudentCreate(StudentBase):
    password: str

class StudentUpdate(StudentBase):
    pass

class Student(StudentBase):
    id: int

    class Config:
        orm_mode: True

class AcademicRecordBase(BaseModel):
    student_id: int
    courses: list[str]
    grades: dict[str, str]
    attendance: float

class AcademicRecord(AcademicRecordBase):
    id: int

    class Config:
        orm_mode: True
