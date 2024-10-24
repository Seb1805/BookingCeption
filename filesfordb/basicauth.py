from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import hashlib

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
        return f"<User(username={self.username})>"
#Use the web to find correct format for connection string
engine = create_engine("mssql+pyodbc://username:password@localhost/database_name")
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add this function to hash passwords
def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    pwdhash = pwdhash.hex()
    return pwdhash

def verify_password(plain_password, hashed_password):
    salt = hashed_password[:64]
    stored_hash = hashed_password[64:]
    pwdcheck = hashlib.pbkdf2_hmac('sha512', plain_password.encode('utf-8'), salt.encode('ascii'), 100000)
    return pwdcheck.hex() == stored_hash

# Modify authenticate_user function
def authenticate_user(db, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
