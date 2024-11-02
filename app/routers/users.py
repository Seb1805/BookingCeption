from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import UserCreate
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from ..utils.security import get_current_user,get_password_hash
from fastapi import APIRouter, Depends, HTTPException, status
from app.utils.security import get_current_user, get_db,authenticate_user
from ..models import UserCreate,User,UserPydantic
Base = declarative_base()

router = APIRouter(prefix="/users", tags=["users"])



@router.get("/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/{user_id}")
async def get_user_by_id(user_id: int,db: Session = Depends(get_db)):
    user = db.query(User).filter(User.userId == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/{email}")
async def get_user_by_email(email: str,db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserPydantic)
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
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_user

@router.put("/{user_id}", response_model=UserPydantic)
def update_user(user_id: int, user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.userId == user_id).first()
    
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Update fields based on user_data
    for field in ["firstname", "lastname", "email", "password", "address", "role"]:
        setattr(existing_user, field, getattr(user_data, field))
    
    hashed_password = get_password_hash(user_data.password) if user_data.password else None
    
    if hashed_password:
        existing_user.password = hashed_password
    
    try:
        db.commit()
        db.refresh(existing_user)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.userId == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        db.delete(user)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "User deleted successfully"}

