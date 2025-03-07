from fastapi import APIRouter

router = APIRouter()

@router.get("/students/me")
def get_profile():
    return {"message": "Get student profile endpoint"}

@router.get("/students/academic-records")
def get_academic_records():
    return {"message": "Get academic records endpoint"}
