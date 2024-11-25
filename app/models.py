from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey,Date,Time,Float,Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
import hashlib
from sqlalchemy.sql import select
from sqlalchemy.orm import Session
from datetime import time,date
from pydantic import BaseModel
from typing import Optional,List
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

    #bookings = relationship("Booking", back_populates="user")

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



class Location(Base):
    __tablename__ = "Location"
    
    locationId = Column(Integer, primary_key=True)
    locationName = Column(String(150))
    address = Column(String(150))
    city = Column(String(150))
    organizerId = Column(Integer)


class LocationBase(BaseModel):
    locationName: str
    address: str
    city: str
    organizerId: int
    

class LocationCreate(LocationBase):
    pass

class LocationUpdate(LocationBase):
    pass

class LocationPydantic(LocationBase):
    location_id: int
    organizer_id: List["OrganizerPydantic"] = []

    class Config:
        orm_mode = True

#Organizers
class Organizer(Base):
    __tablename__ = "Organizer"

    organizerId  = Column(Integer, primary_key=True)
    name = Column(String)


# class OrganizerCreate(BaseModel):
#     locationId: int
#     campaignId: int
#     name: str

class OrganizerBase(BaseModel):
    name: str

class OrganizerCreate(OrganizerBase):
    pass

class OrganizerUpdate(OrganizerBase):
    pass

class OrganizerPydantic(OrganizerBase):
    organizerId: int

    class Config:
        orm_mode = True

class CampaignOrganizerAssociation(Base):
    __tablename__ = "CampaignOrganizerAssociation"
    
    userCompanyAssosiationId = Column(Integer, primary_key=True)
    campaignId = Column(Integer)
    organizerId = Column(Integer)

    # user = relationship("User", back_populates="organizers")
    # organizer = relationship("Organizer", back_populates="users")

class CampaignOrganizerAssociationBase(BaseModel):
    campaignId: int
    organizerId: int

class CampaignOrganizerAssociationCreate(CampaignOrganizerAssociationBase):
    pass

class CampaignOrganizerAssociationUpdate(CampaignOrganizerAssociationBase):
    pass

class CampaignOrganizerAssociationPydantic(CampaignOrganizerAssociationBase):
    userCompanyAssosiationId: int
    campaignId: List["CampaignPydantic"] = []
    organizerId: List["OrganizerPydantic"] = []

    class Config:
        orm_mode = True

#Campaign
class Campaign(Base):
    __tablename__ = "Campaign"

    campaignId  = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    coverImage = Column(String)
    dateStart = Column(Date)
    timeStart = Column(Time)
    dateEnd = Column(Date)
    timeEnd = Column(Time)
    sectionId = Column(Integer)
    active =  Column(Boolean)

# class Campaign(Base):
#     __tablename__ = "campaign"
    
#     campaign_id = Column(Integer, primary_key=True)
#     name = Column(String)
#     description = Column(String)
#     cover_image = Column(String)
#     date_start = Column(Date)
#     time_start = Column(Time)
#     date_end = Column(Date)
#     time_end = Column(Time)
#     section_id = Column(Integer, ForeignKey("section.section_id"))
#     price = Column(Float)

#     section = relationship("Section", back_populates="campaigns")


# class CampaignCreate(BaseModel):
#     name : str
#     description : str
#     coverImage : str #maybe blob
#     dateStart : date
#     timeStart : time
#     dateEnd : date
#     timeEnd : time
#     sectionId : int
#     price : float
class CampaignBase(BaseModel):
    name : str
    description : str
    coverImage : str #maybe blob
    dateStart : date
    timeStart : time
    dateEnd : date
    timeEnd : time
    sectionId : int
    active : bool

class CampaignCreate(CampaignBase):
    pass

class CampaignUpdate(CampaignBase):
    pass

class CampaignPydantic(CampaignBase):
    campaign_id: int
    organizers: List["OrganizerPydantic"] = []
    tickets: List["TicketPydantic"] = []

    class Config:
        orm_mode = True
#Booking

class Booking(Base):
    __tablename__ = "bookings"
    
    bookingId = Column(Integer, primary_key=True, index=True)
    userId = Column(Integer, ForeignKey("users.userId"))
    bookingStatusId = Column(Integer, ForeignKey("BookingStatus.bookingStatusId"))
    dateCreated = Column(Date, default=date.today)
    bookingCampaigns = relationship("BookingCampaign", back_populates="booking")


class BookingBase(BaseModel):
    userId: int
    bookingStatusId: int
    dateCreated: date

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BookingBase):
    pass

class BookingPydantic(BookingBase):
    bookingStatusId: dict = {}
    userId: dict = {}

    class Config:
        orm_mode = True

from pydantic import BaseModel

class BookingExtendedCreate(BaseModel):
    userId: int
    bookingStatusId: int
    bookingCampaigns: List[dict]

class BookingExtendedUpdate(BookingExtendedCreate):
    bookingId: int

class BookingExtendedPydantic(BaseModel):
    bookingId: int
    userId: int
    bookingStatusId: int
    dateCreated: date
    bookingCampaigns: List[dict]

    class Config:
        orm_mode = True



#Booking status
class BookingStatus(Base):
    __tablename__ = "BookingStatus"
    
    bookingStatusId = Column(Integer, primary_key=True)
    status = Column(String)

    #bookings = relationship("Booking", back_populates="bookingstatus")

class BookingStatusPydantic:
    status : str




#Booking Campaign
class BookingCampaign(Base):
    __tablename__ = "BookingCampaign"
    
    bookingCampaignId = Column(Integer, primary_key=True)
    ticketId = Column(Integer,ForeignKey("Ticket.ticketId"))
    ticketAmount = Column(Integer)
    sumPrice = Column(Float)
    bookingId = Column(Integer,ForeignKey("Bookings.bookingId"))
    booking = relationship("Booking", back_populates="bookingCampaigns")
    #ticket = relationship("Ticket", back_populates="bookings")


class BookingCampaignBase(BaseModel):
    ticketId: int
    ticketAmount: int
    sumPrice: float
    bookingId: int

class BookingCampaignCreate(BookingCampaignBase):
    pass

class BookingCampaignUpdate(BookingCampaignBase):
    pass

class BookingCampaignPydantic(BookingCampaignBase):
    bookingCampaignId: int
    ticketId: dict = {}
    bookingId: dict = {}

    class Config:
        orm_mode = True

#User Role
class UserRole(Base):
    __tablename__ = "UserRole"
    
    userRole = Column(Integer, primary_key=True)
    name = Column(String)

class UserRoleBase(BaseModel):
    userRole: int
    name: str

class UserRoleCreate(UserRoleBase):
    pass

class UserRoleUpdate(UserRoleBase):
    pass

class UserRolePydantic(UserRoleBase):
    userRoles: List["UserRolePydantic"] = []

    class Config:
        orm_mode = True
#Company
class Company(Base):
    __tablename__ = "Company"
    
    company_id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    logo = Column(String)
    CVR = Column(String)

class CompanyBase(BaseModel):
    name: str
    address: str
    logo: str
    CVR: str

class CompanyCreate(CompanyBase):
    pass

class CompanyUpdate(CompanyBase):
    pass

class CompanyPydantic(CompanyBase):
    companies: List["CompanyPydantic"] = []

    class Config:
        orm_mode = True

#UserCompanyAssociation
class UserCompanyAssociation(Base):
    __tablename__ = "UserCompanyAssociation"
    
    userCompanyAssosiationId = Column(Integer, primary_key=True)
    userId = Column(Integer)
    companyId = Column(Integer)

    # user = relationship("User", back_populates="companies")
    # company = relationship("Company", back_populates="users")

class UserCompanyAssociationBase(BaseModel):
    userId: int
    companyId: int

class UserCompanyAssociationCreate(UserCompanyAssociationBase):
    pass

class UserCompanyAssociationUpdate(UserCompanyAssociationBase):
    pass

class UserCompanyAssociationPydantic(UserCompanyAssociationBase):
    userCompanyAssosiationId: int

    class Config:
        orm_mode = True




#Ticket
class Ticket(Base):
    __tablename__ = "Ticket"
    
    ticketId = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    validDateStart = Column(Date)
    validDateEnd = Column(Date)
    validTimeStart = Column(Time)
    spotId = Column(Integer)
    campaignId = Column(Integer)
    active = Column(Boolean)
    amount = Column(Integer)



class TicketBase(BaseModel):
    name: str
    price: float
    validDateStart: date
    validDateEnd: date
    validTimeStart: time
    spotId: int
    campaignId: int
    active: bool
    amount: int

class TicketCreate(TicketBase):
    pass

class TicketUpdate(TicketBase):
    pass

class TicketPydantic(TicketBase):
    ticketId: int
    spot: dict = {}
    campaign: dict = {}

    class Config:
        orm_mode = True



#Section
class Section(Base):
    __tablename__ = "Section"
    
    sectionId = Column(Integer, primary_key=True)
    locationId = Column(Integer)
    name = Column(String)
    roomForParticipants = Column(Integer)
    layoutImage = Column(String)


class SectionBase(BaseModel):
    sectionId: int
    locationId: int
    name: str
    roomForParticipants: int
    layoutImage: str

class SectionCreate(SectionBase):
    pass

class SectionUpdate(SectionBase):
    pass

class SectionPydantic(SectionBase):
    sectionId: int
    locationId: dict = {}

    class Config:
        orm_mode = True

#Spot
class Spot(Base):
    __tablename__ = "Spot"
    
    spotId = Column(Integer, primary_key=True)
    status = Column(Boolean)
    position = Column(String)
    lengthCM = Column(Integer)
    widthCM = Column(Integer)
    priceExtra = Column(Float)
    pricePrSquareMeter = Column(Float)
    spotType = Column(Integer)
    sectionId = Column(Integer)
    spotnumber = Column(Integer)


class SpotBase(BaseModel):
    status: bool
    position: str
    lengthCM: int
    widthCM: int
    priceExtra: float
    pricePrSquareMeter: float
    spotType: int
    sectionId: int
    spotnumber: int

class SpotCreate(SpotBase):
    pass

class SpotUpdate(SpotBase):
    pass

class SpotPydantic(SpotBase):
    spotId: int
    sections: List["SectionPydantic"] = []
    spot_types: dict = {}
    section_id: dict = {}

    class Config:
        orm_mode = True

#UserOrganizerAssociation

class UserOrganizerAssosiation(Base):
    __tablename__ = "UserOrganizerAssosiation"
    
    user_organizer_association_id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    organizer_id = Column(Integer)

    # user = relationship("User", back_populates="organizers")
    # organizer = relationship("Organizer", back_populates="users")

class UserOrganizerAssociationBase(BaseModel):
    user_id: int
    organizer_id: int

class UserOrganizerAssociationCreate(UserOrganizerAssociationBase):
    pass

class UserOrganizerAssociationUpdate(UserOrganizerAssociationBase):
    pass

class UserOrganizerAssociationPydantic(UserOrganizerAssociationBase):
    user_organizer_association_id: int

    class Config:
        orm_mode = True

#Spottype
class SpotType(Base):
    __tablename__ = "SpotType"
    
    spotTypeId = Column(Integer, primary_key=True)
    name = Column(String)

    # spots = relationship("Spot", back_populates="spot_types")

class SpotTypeBase(BaseModel):
    name: str

class SpotTypeCreate(SpotTypeBase):
    pass

class SpotTypeUpdate(SpotTypeBase):
    pass

class SpotTypePydantic(SpotTypeBase):
    spotTypeId: int


















