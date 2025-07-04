from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, admin, student
# from app.utils.database import engine, Base

# Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configure CORS for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(auth.router)
app.include_router(admin.router)
app.include_router(student.router)

@app.get('/')
def read_root():
    return {'message': 'Welcome to Mother\'s Aid Schools API'}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
