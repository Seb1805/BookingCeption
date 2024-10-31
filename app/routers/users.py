from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import UserCreate
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from typing import Optional
from pydantic import BaseModel
from ..utils.security import get_current_user,get_password_hash
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.utils.security import get_current_user, get_db,authenticate_user
from ..models import UserCreate,User
Base = declarative_base()

router = APIRouter(prefix="/users", tags=["users"])

class UserReturn(BaseModel):
    userId: int
    firstname: str
    lastname: str
    email: str
    password: str
    address: Optional[str] = None
    role: int

    class Config:
        orm_mode = True



@router.get("/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/", response_model=UserReturn)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    
    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        password=hashed_password,
        role=user.role
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_user
