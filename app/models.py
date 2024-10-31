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
# app/utils/models.py
from sqlalchemy.orm import declarative_base
Base = declarative_base()


#User
class User(Base):
    __tablename__ = "User"
    
    userId = Column(Integer, primary_key=True)
    firstname = Column(String(150))
    lastname = Column(String(150))
    email = Column(String(150), unique=True)
    password = Column(String(255))
    address = Column(String(150))
    role = Column(Integer)

    def __repr__(self):
        return f"<User(username={self.firstname})>"


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    address: Optional[str] = None
    role: int


class UserPydantic(BaseModel):
    userId: int
    firstname: str
    lastname: str
    email: str
    password: str
    address: str | None
    role: int

    class Config:
        orm_mode = True


#Location
class Location(Base):
    __tablename__ = "User"
    
    locationId = Column(Integer, primary_key=True)
    locationName = Column(String(150))
    address = Column(String(150))

    def __repr__(self):
        return f"<User(username={self.firstname})>"
    
class LocationCreate(BaseModel):
    locationName: str
    address = str


#Campaign
class Campaign(Base):
    __tablename__ = "Campaign"

    campaignId  = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    coverImage = Column(String)
    dateStart = Column(date)

    