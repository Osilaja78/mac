from fastapi import FastAPI
from app.routers import auth, admin, student
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(student.router)

@app.get('/')
def read_root():
    return {'message': 'Welcome to Mother\'s Aid Schools API'}
