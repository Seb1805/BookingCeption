from fastapi import APIRouter, Depends
from ..utils.security import get_current_user,hash_password
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import UserCreate,User

router = APIRouter(prefix="/users", tags=["users"])

from pydantic import BaseModel
from typing import Optional

class UserReturn(BaseModel):
    userId: int
    firstname: str
    lastname: str
    email: str
    password: str
    address: Optional[str] = None

    class Config:
        orm_mode = True


@router.get("/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/", response_model=UserReturn)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Hash the password
    hashed_password = hash_password(user.password)
    
    # Create a new user
    new_user = User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        password=hashed_password
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_user

