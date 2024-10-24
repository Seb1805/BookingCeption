from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import hashlib
from sqlalchemy.sql import select
from sqlalchemy.orm import Session

from pydantic import BaseModel
from typing import Optional




Base = declarative_base()

class User(Base):
    __tablename__ = "User"
    
    userId = Column(Integer, primary_key=True)
    firstname = Column(String(150))
    lastname = Column(String(150))
    email = Column(String(150))
    password = Column(String(150))
    address = Column(String(150))
    #disabled: Optional[bool] = False
    # username = Column(String(50), unique=True)
    #hashed_password = Column(String(255))
    
    def __repr__(self):
        return f"<User(username={self.firstname})>"
    



class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    address: Optional[str] = None
