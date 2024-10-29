from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..utils.security_old import Token, TokenData
from ..utils.security_old import SECRET_KEY,ALGORITHM,create_access_token,authenticate_user,get_current_active_user


from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import timedelta
from sqlalchemy.orm import Session
from ..database import get_db
from ..utils.security import ACCESS_TOKEN_EXPIRE_MINUTES,authenticate_user, create_access_token, get_current_user,get_current_active_user
from ..routers.users import User as DbUser

#oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()
router = APIRouter(prefix="/token", tags=["token"])

@router.post("/", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    print(f"Received form data: {form_data}")
    user = authenticate_user(db, form_data.username, form_data.password)
    
    if not user:
        print(f"No user found for {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user



# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# app = FastAPI()
# router = APIRouter(prefix="/token", tags=["token"])

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# @app.post("/", response_model=Token)
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
    
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.email}, expires_delta=access_token_expires
#     )
    
#     return {"access_token": access_token, "token_type": "bearer"}

# @app.get("/users/me", response_model=User)
# def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user



# def get_current_active_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)) -> User:
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = db.query(User).filter(User.email == token_data.username).first()
#     if user is None:
#         raise credentials_exception
#     return user

# Don't forget to import SECRET_KEY and ALGORITHM from your security file
