from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User, UserInDB,UserBase
from pydantic import BaseModel
from typing import Optional
from passlib.context import CryptContext
import hashlib
import os
from sqlalchemy.sql import select
from ..routers.users import User as DbUser
from passlib.hash import bcrypt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], default="bcrypt")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None



class UserBase(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class User(UserBase):
    hashed_password: str

class UserInDB(User):
    password: str

from sqlalchemy.orm import Session
from ..models import User

def authenticate_user(db: Session, username: str, password: str):
    hp = pwd_context.hash(password)
    user = db.query(DbUser).filter(DbUser.email == username).first()
    hashed_password = hash_password(password)
    print(f"Hashed password: {hashed_password}")
    print(f"User hash: {user.password}")
    print(f" pwd_context: {hp}")
# if not hashed_password == user.hashed_password:
#     raise HTTPException(status_code=400, detail="Incorrect username or password")

    if not user:
        return None
    
    if not verify_password(password, user.password):
        return None
    
    return user

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = await get_user(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def create_access_token(data):
    # data should contain only public information about the user
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user




def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# def hash_password(password: str) -> str:
#     salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
#     pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
#     pwdhash = pwdhash.hex()
#     return pwdhash

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     salt = hashed_password[:64]
#     stored_hash = hashed_password[64:]
#     pwdcheck = hashlib.pbkdf2_hmac('sha512', plain_password.encode('utf-8'), salt.encode('ascii'), 100000)
#     return pwdcheck.hex() == stored_hash

# def authenticate_user(db: Session, username: str, password: str) -> DbUser | None:
#     user = db.query(DbUser).filter(DbUser.email == username).first()
#     print(user)
#     if not user:
#         return None
#     if not verify_password(password, DbUser.password):
#         return None
#     return user

async def get_user(db: Session, email: str) -> User | None:
    statement = select(DbUser).where(DbUser.email == email)
    result = db.execute(statement)
    return result.scalar_one_or_none()

async def create_user(db: Session, user: User) -> User:
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt


