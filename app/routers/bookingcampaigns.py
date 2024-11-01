from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security import get_current_user
from ..models import BookingCampaign,BookingCampaignPydantic,BookingCampaignCreate,BookingCampaignUpdate
from ..database import get_db
from sqlalchemy.orm import Session


router = APIRouter(prefix="/booking_campaigns", tags=["booking_campaigns"])


@router.get("/")
def get_booking_campaigns(db: Session = Depends(get_db)):
    campaigns = db.query(BookingCampaign).all()
    return {"campaigns": campaigns}

@router.get("/{campaign_id}")
def get_booking_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(BookingCampaign).filter(BookingCampaign.bookingCampaignId == campaign_id).first()
    return {"campaign": campaign}

@router.post("/", response_model=BookingCampaignPydantic)
def create_booking(bookingCampaign: BookingCampaignCreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_active_user)):


    #Skip check for existing for now
    #     
    #existing_booking = db.query(Booking).filter(Booking.email == booking.email).first()
    
    # if existing_booking:
    #     raise HTTPException(status_code=400, detail="Email already registered")
    
    new_booking_campaign = BookingCampaign(
        ticketId = bookingCampaign.ticketId,
        ticketAmount = bookingCampaign.ticketAmount
    )
    
    try:
        db.add(new_booking_campaign)
        db.commit()
        db.refresh(new_booking_campaign)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_booking_campaign


@router.put("/{booking_id}", response_model=BookingCampaignPydantic)
def update_booking(bookingCampaignId: int, booking_data: BookingCampaignUpdate, db: Session = Depends(get_db)):
    existing_bookingCampaign = db.query(BookingCampaign).filter(BookingCampaign.bookingCampaignId == bookingCampaignId).first()
    
    if not existing_bookingCampaign:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Update fields based on booking_data
    for field in ["ticketId", "ticketAmount"]:
        setattr(existing_bookingCampaign, field, getattr(booking_data, field))
    
    try:
        db.commit()
        db.refresh(existing_bookingCampaign)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_bookingCampaign

@router.delete("/{booking_id}")
def delete_user(booking_id: int, db: Session = Depends(get_db)):
    user = db.query(BookingCampaign).filter(BookingCampaign.bookingCampaignId == booking_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        db.delete(user)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "User deleted successfully"}
