from fastapi import APIRouter, Depends
from ..utils.security_old import get_current_user,hash_password
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import UserCreate
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey

Base = declarative_base()

from sqlalchemy import Column, String
from sqlalchemy.orm import Mapped, mapped_column

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# class User(Base):
#     __tablename__ = "User"
    
#     userId = Column(Integer, primary_key=True)
#     firstname = Column(String(150))
#     lastname = Column(String(150))
#     email = Column(String(150))
#     password_hash = Mapped[str]

#     @mapped_column(String(255))
#     def password_hash(self):
#         return self.password_hash

#     @password_hash.setter
#     def password_hash(self, value):
#         self.password_hash = value






class User(Base):
    __tablename__ = "User"
    
    userId = Column(Integer, primary_key=True)
    firstname = Column(String(150))
    lastname = Column(String(150))
    email = Column(String(150))
    password = Column(String(150))
    address = Column(String(150))
    
    def __repr__(self):
        return f"<User(username={self.firstname})>"


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




# from sqlalchemy import Column, String
# from sqlalchemy.orm import Mapped, mapped_column

# class User(Base):
#     __tablename__ = "User"
    
#     userId = Column(Integer, primary_key=True)
#     firstname = Column(String(150))
#     lastname = Column(String(150))
#     email = Column(String(150))
#     password_hash = Mapped(str)  # Changed from password to password_hash
    
#     @property
#     def password(self):
#         return self.password_hash  # This allows you to access the hashed password as if it were plain text
    
#     @password.setter
#     def password(self, value):
#         self.password_hash = hash_password(value)  # Implement this function to hash passwords
    
#     @property
#     def hashed_password(self):
#         return self.password_hash  # This allows you to access the hashed password directly
    
#     @hashed_password.setter
#     def hashed_password(self, value):
#         self.password_hash = value  # This allows you to set the hashed password directly
