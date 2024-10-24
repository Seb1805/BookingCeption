from dotenv import load_dotenv
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import create_engine, MetaData
import os
from sqlalchemy.ext.declarative import declarative_base
import urllib

load_dotenv()

#DATABASE_URL = os.getenv("DATABASE_URL")
# Read the connection string from .env file
connection_string = os.getenv("DATABASE_URL")

# Encode the connection string
encoded_string = urllib.parse.quote_plus(connection_string)

# Create SQLAlchemy engine
engine = create_engine(f'mssql+pyodbc:///?odbc_connect={encoded_string}')
#engine = create_engine(DATABASE_URL)
Base = declarative_base()
Base.metadata.create_all(bind=engine)


#Use the web to find correct format for connection string
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()