from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security_old import get_current_user
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Booking,BookingCreate,BookingPydantic,BookingUpdate,User, BookingCampaign, Ticket, Section, Location, Campaign, Spot
from ..utils.security import get_current_active_user
from datetime import date


router = APIRouter(prefix="/bookings", tags=["bookings"])
@router.get("/")
def get_bookings(db: Session = Depends(get_db)):
    bookings = db.query(Booking).all()
    return {"bookings": bookings}

@router.get("/{booking_id}")
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.bookingId == booking_id).first()
    return {"booking": booking}

@router.post("/", response_model=BookingPydantic)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_active_user)):


    #Skip check for existing for now
    #     
    #existing_booking = db.query(Booking).filter(Booking.email == booking.email).first()
    
    # if existing_booking:
    #     raise HTTPException(status_code=400, detail="Email already registered")
    
    new_booking = Booking(
        userId=current_user.userId,
        bookingStatusId=booking.bookingStatusId,
        dateCreated=booking.dateCreated
    )
    
    try:
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_booking


@router.put("/{booking_id}", response_model=BookingPydantic)
def update_booking(booking_id: int, booking_data: BookingUpdate, db: Session = Depends(get_db)):
    existing_booking = db.query(Booking).filter(Booking.bookingId == booking_id).first()
    
    if not existing_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Update fields based on booking_data
    for field in ["userId", "bookingStatusId", "bookingCampaignId"]:
        setattr(existing_booking, field, getattr(booking_data, field))
    
    try:
        db.commit()
        db.refresh(existing_booking)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.bookingId == booking_id).first()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    try:
        db.delete(booking)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Booking deleted successfully"}
