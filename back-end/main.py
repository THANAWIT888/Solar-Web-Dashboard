from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from sqlalchemy import create_engine, Column, String, DateTime, Boolean, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from fastapi.security import OAuth2PasswordBearer

# ตั้งค่า FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # อนุญาตทุกต้นทาง
    allow_credentials=True,
    allow_methods=["*"],  # อนุญาตทุกวิธี HTTP (GET, POST, PUT, DELETE ฯลฯ)
    allow_headers=["*"],  # อนุญาตทุกหัวข้อ
)

# ตั้งค่าการเชื่อมต่อฐานข้อมูล PostgreSQL
DATABASE_URL = "postgresql://postgres:Automation01@172.16.1.212/pico_smart_office"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ตั้งค่า JWT
SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = "HS256"

# ตั้งค่า OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# โมเดลฐานข้อมูล
class User(Base):
    __tablename__ = "users_table"

    id = Column(Integer, primary_key=True, index=True)  # เพิ่ม primary key
    firstname = Column(String, index=True)
    lastname = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime)
    is_active = Column(Boolean, default=True)

# โมเดลสำหรับรับข้อมูล
class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    email: str
    role: str
    firstname: str
    lastname: str

# ฟังก์ชันเช็ครหัสผ่าน
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# ฟังก์ชันสร้างและถอดรหัส JWT
def create_jwt_token(data: dict, expires_delta: int = 3600) -> str:
    expiration = datetime.utcnow() + timedelta(seconds=expires_delta)
    data.update({"exp": expiration})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ฟังก์ชันสำหรับการเชื่อมต่อฐานข้อมูล
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ฟังก์ชันดึงข้อมูลผู้ใช้จาก JWT
def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    payload = decode_jwt_token(token)
    if "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return payload

# การลงทะเบียนผู้ใช้
@app.post("/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # ตรวจสอบว่า email มีอยู่แล้วในฐานข้อมูลหรือไม่
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        password_hash=hashed_password,
        role=user.role,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    return {"message": "User registered successfully"}

# การเข้าสู่ระบบ
@app.post("/login", response_model=Token)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user and verify_password(user.password, db_user.password_hash):
        token_data = {"sub": user.email, "firstname": db_user.firstname, "lastname": db_user.lastname, "role": db_user.role}
        access_token = create_jwt_token(token_data)
        return {
            "access_token": access_token,  # ตรวจสอบว่ามีข้อมูลนี้ในคำตอบ
            "token_type": "bearer",       # ตรวจสอบว่ามีข้อมูลนี้ในคำตอบ
            "email": db_user.email,
            "firstname": db_user.firstname,
            "lastname": db_user.lastname,
            "role": db_user.role
        }
    raise HTTPException(status_code=401, detail="Invalid email or password")

# ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ที่ล็อกอิน
@app.get("/users/me", response_model=Token)
async def read_users_me(current_user: dict = Depends(get_current_user)):
    try:
        return {
            "access_token": "",  # หรือส่งคืนค่า token หากต้องการ
            "token_type": "bearer",
            "email": current_user.get("sub", ""),
            "firstname": current_user.get("firstname", ""),
            "lastname": current_user.get("lastname", ""),
            "role": current_user.get("role", "")
        }
    except Exception as e:
        print(f"Error in /users/me: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

   

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = decode_jwt_token(token)
        if "sub" not in payload:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {
            "sub": payload.get("sub"),
            "firstname": payload.get("firstname", ""),
            "lastname": payload.get("lastname", ""),
            "role": payload.get("role", "")
        }
    except Exception as e:
        print(f"Error in get_current_user: {e}")
        raise HTTPException(status_code=401, detail="Unauthorized")

