from fastapi import APIRouter

router = APIRouter()

@router.post("/admin/students")
def register_student():
    return {"message": "Register student endpoint"}

@router.put("/admin/students/{id}")
def update_student(id: int):
    return {"message": f"Update student {id} endpoint"}

@router.post("/admin/news")
def create_news():
    return {"message": "Create news endpoint"}

@router.get("/admin/students")
def list_students():
    return {"message": "List students endpoint"}
