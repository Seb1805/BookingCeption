from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security_old import get_current_user
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import BookingStatus,BookingStatusPydantic
from ..utils.security import get_current_active_user

router = APIRouter(prefix="/booking_statuses", tags=["booking_statuses"])

@router.get("/")
def get_booking_statuses(db: Session = Depends(get_db)):
    statuses = db.query(BookingStatus).all()
    return {"statuses": statuses}

@router.get("/{status_id}")
def get_booking_status(status_id: int, db: Session = Depends(get_db)):
    status = db.query(BookingStatus).filter(BookingStatus.bookingStatusId == status_id).first()
    return {"status": status}

router.post("/", response_model=BookingStatusPydantic)
def create_booking_status(bookingstatus: BookingStatus, db: Session = Depends(get_db),current_user: User = Depends(get_current_active_user)):

    new_booking_status = BookingStatus(
        status = bookingstatus.status
    )
    
    try:
        db.add(new_booking_status)
        db.commit()
        db.refresh(new_booking_status)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_booking_status


@router.put("/{bookingstatus_id}", response_model=BookingStatusPydantic)
def update_booking(bookingstatus_id: int, booking_data: BookingStatus, db: Session = Depends(get_db)):
    existing_bookingstatus = db.query(BookingStatus).filter(BookingStatus.bookingStatusId == bookingstatus_id).first()
    
    if not existing_bookingstatus:
        raise HTTPException(status_code=404, detail="Booking status not found")
    
    # Update fields based on booking_data
    for field in ["status"]:
        setattr(existing_bookingstatus, field, getattr(booking_data, field))
    
    try:
        db.commit()
        db.refresh(existing_bookingstatus)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_bookingstatus

@router.delete("/{bookingstatus_id}")
def delete_bookingstatus(bookingstatus_id: int, db: Session = Depends(get_db)):
    bookingstatus = db.query(BookingStatus).filter(BookingStatus.bookingStatusId == bookingstatus_id).first()
    
    if not bookingstatus:
        raise HTTPException(status_code=404, detail="Booking status not found")
    
    try:
        db.delete(bookingstatus)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Booking status deleted successfully"}
