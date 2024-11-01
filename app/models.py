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


# class UserBase(BaseModel):
#     firstname: str
#     lastname: str
#     email: str
#     password: str
#     address: str
#     role: int

# class UserCreate(UserBase):
#     pass

# class UserUpdate(UserBase):
#     pass

# class UserPydantic(UserBase):
#     user_id: int
#     bookings: List["BookingPydantic"] = []

#     class Config:
#         orm_mode = True

#Location
# class Location(Base):
#     __tablename__ = "location"
    
#     location_id = Column(Integer, primary_key=True)
#     location_name = Column(String)
#     address = Column(String)
#     organizer_id = Column(Integer, ForeignKey("organizer.organizer_id"))

#     organizers = relationship("Organizer", back_populates="locations")
class Location(Base):
    __tablename__ = "Location"
    
    locationId = Column(Integer, primary_key=True)
    locationName = Column(String(150))
    address = Column(String(150))

    def __repr__(self):
        return f"<User(username={self.firstname})>"
    
class LocationCreate(BaseModel):
    locationName: str
    address: str

# class LocationBase(BaseModel):
#     location_name: str
#     address: str
#     organizer_id: int

# class LocationCreate(LocationBase):
#     pass

# class LocationUpdate(LocationBase):
#     pass

# class LocationPydantic(LocationBase):
#     location_id: int
#     sections: List["SectionPydantic"] = []

#     class Config:
#         orm_mode = True
#Organizers
# class Organizer(Base):
#     __tablename__ = "organizer"
    
#     organizer_id = Column(Integer, primary_key=True)
#     campaign_id = Column(Integer, ForeignKey("campaign.campaign_id"))
#     name = Column(String)

#     campaigns = relationship("Campaign", back_populates="organizers")
class Organizer(Base):
    __tablename__ = "Organizer"

    organizerId  = Column(Integer, primary_key=True)
    locationId = Column(Integer)
    campaignId = Column(Integer)
    name = Column(String)


class OrganizerCreate(BaseModel):
    locationId: int
    campaignId: int
    name: str

# class OrganizerBase(BaseModel):
#     campaign_id: int
#     name: str

# class OrganizerCreate(OrganizerBase):
#     pass

# class OrganizerUpdate(OrganizerBase):
#     pass

# class OrganizerPydantic(OrganizerBase):
#     organizer_id: int
#     locations: List["LocationPydantic"] = []

#     class Config:
#         orm_mode = True


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
    price =  Column(Float)

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
    name: str
    description: str
    cover_image: str
    date_start: date
    time_start: time
    date_end: date
    time_end: time
    section_id: int
    price: float

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
    __tablename__ = "booking"
    
    booking_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    booking_status_id = Column(Integer, ForeignKey("bookingstatus.booking_status_id"))
    booking_campaign_id = Column(Integer, ForeignKey("bookingcampaign.booking_campaign_id"))

    user = relationship("User", back_populates="bookings")
    booking_status = relationship("BookingStatus", back_populates="bookings")
    booking_campaign = relationship("BookingCampaign", back_populates="bookings")

class BookingStatus(Base):
    __tablename__ = "bookingstatus"
    
    booking_status_id = Column(Integer, primary_key=True)
    status = Column(String)

    bookings = relationship("Booking", back_populates="booking_status")


class BookingStatusEnum(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

class BookingBase(BaseModel):
    booking_status_id: int
    status: BookingStatusEnum

class BookingCreate(BookingBase):
    pass

class BookingUpdate(BookingBase):
    pass

class BookingPydantic(BookingBase):
    booking_id: int
    user_id: int
    booking_status_id: int
    booking_campaign_id: int

    class Config:
        orm_mode = True


#User Role
class UserRole(Base):
    __tablename__ = "userrole"
    
    user_role = Column(Integer, primary_key=True)
    name = Column(String)

class UserRoleBase(BaseModel):
    user_role: int
    name: str

class UserRoleCreate(UserRoleBase):
    pass

class UserRoleUpdate(UserRoleBase):
    pass

class UserRolePydantic(UserRoleBase):
    user_roles: List["UserRolePydantic"] = []

    class Config:
        orm_mode = True
#Company
class Company(Base):
    __tablename__ = "company"
    
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
    __tablename__ = "usercompanyassociation"
    
    user_company_association_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    company_id = Column(Integer, ForeignKey("company.company_id"))

    user = relationship("User", back_populates="companies")
    company = relationship("Company", back_populates="users")

class UserCompanyAssociationBase(BaseModel):
    user_id: int
    company_id: int

class UserCompanyAssociationCreate(UserCompanyAssociationBase):
    pass

class UserCompanyAssociationUpdate(UserCompanyAssociationBase):
    pass

class UserCompanyAssociationPydantic(UserCompanyAssociationBase):
    user_company_association_id: int

    class Config:
        orm_mode = True




#Ticket
class Ticket(Base):
    __tablename__ = "ticket"
    
    ticket_id = Column(Integer, primary_key=True)
    name = Column(String)
    price = Column(Float)
    valid_date_start = Column(Date)
    valid_date_end = Column(Date)
    valid_time_start = Column(Time)
    spot_id = Column(Integer, ForeignKey("spot.spot_id"))
    campaign_id = Column(Integer, ForeignKey("campaign.campaign_id"))

    spot = relationship("Spot", back_populates="tickets")
    campaign = relationship("Campaign", back_populates="tickets")

class TicketBase(BaseModel):
    name: str
    price: float
    valid_date_start: date
    valid_date_end: date
    valid_time_start: time
    spot_id: int
    campaign_id: int

class TicketCreate(TicketBase):
    pass

class TicketUpdate(TicketBase):
    pass

class TicketPydantic(TicketBase):
    ticket_id: int
    spot: dict = {}
    campaign: dict = {}

    class Config:
        orm_mode = True

#Booking Campaign
class BookingCampaign(Base):
    __tablename__ = "bookingcampaign"
    
    booking_campaign_id = Column(Integer, primary_key=True)
    ticket_id = Column(Integer, ForeignKey("ticket.ticket_id"))
    ticket_amount = Column(Integer)

    ticket = relationship("Ticket", back_populates="bookings")

class BookingCampaignBase(BaseModel):
    ticket_id: int
    ticket_amount: int

class BookingCampaignCreate(BookingCampaignBase):
    pass

class BookingCampaignUpdate(BookingCampaignBase):
    pass

class BookingCampaignPydantic(BookingCampaignBase):
    booking_campaign_id: int

    class Config:
        orm_mode = True


#Section
class Section(Base):
    __tablename__ = "section"
    
    section_id = Column(Integer, primary_key=True)
    location_id = Column(Integer, ForeignKey("location.location_id"))
    location_item = Column(Integer)
    name = Column(String)
    spot_id = Column(Integer, ForeignKey("spot.spot_id"))
    room_for_participants = Column(Integer)

    location = relationship("Location", back_populates="sections")
    spot = relationship("Spot", back_populates="sections")
class SectionBase(BaseModel):
    location_id: int
    location_item: int
    name: str
    spot_id: int
    room_for_participants: int

class SectionCreate(SectionBase):
    pass

class SectionUpdate(SectionBase):
    pass

class SectionPydantic(SectionBase):
    section_id: int
    spot: dict = {}

    class Config:
        orm_mode = True

#Spot
class Spot(Base):
    __tablename__ = "spot"
    
    spot_id = Column(Integer, primary_key=True)
    status = Column(Boolean)
    position = Column(String)
    length_cm = Column(Integer)
    width_cm = Column(Integer)
    price_extra = Column(Float)
    price_per_square_meter = Column(Boolean)
    spot_type_id = Column(Integer, ForeignKey("spottype.spottype_id"))

    sections = relationship("Section", back_populates="spots")
    spot_types = relationship("SpotType", back_populates="spots")

class SpotBase(BaseModel):
    status: bool
    position: str
    length_cm: int
    width_cm: int
    price_extra: float
    price_per_square_meter: bool
    spot_type_id: int

class SpotCreate(SpotBase):
    pass

class SpotUpdate(SpotBase):
    pass

class SpotPydantic(SpotBase):
    spot_id: int
    sections: List["SectionPydantic"] = []
    spot_types: dict = {}

    class Config:
        orm_mode = True

#UserOrganizerAssociation

class UserOrganizerAssociation(Base):
    __tablename__ = "userorganizerassociation"
    
    user_organizer_association_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.user_id"))
    organizer_id = Column(Integer, ForeignKey("organizer.organizer_id"))

    user = relationship("User", back_populates="organizers")
    organizer = relationship("Organizer", back_populates="users")

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
    __tablename__ = "spottype"
    
    spottype_id = Column(Integer, primary_key=True)
    name = Column(String)

    spots = relationship("Spot", back_populates="spot_types")

class SpotTypeBase(BaseModel):
    name: str

class SpotTypeCreate(SpotTypeBase):
    pass

class SpotTypeUpdate(SpotTypeBase):
    pass


















