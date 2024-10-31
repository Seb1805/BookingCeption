from ..models import Organizer,OrganizerCreate
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..utils.security import get_current_user
from ..database import get_db

router = APIRouter(prefix="/organizers", tags=["organizers"])


@router.get("/")
def get_organizers(db: Session = Depends(get_db)):
    organizers = db.query(Organizer).all()
    return {"organizers": organizers}

@router.get("/{organizer_id}")
def get_organizer(organizer_id: int, db: Session = Depends(get_db)):
    organizer = db.query(Organizer).filter(Organizer.organizerId == organizer_id).first()
    return {"organizer": organizer}

@router.post("/",response_model=OrganizerCreate)
def createLocation(organizer: OrganizerCreate, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    existing_organizer = db.query(Organizer).filter(Organizer.name == organizer.address).first()
    
    if existing_organizer:
        raise HTTPException(status_code=400, detail="Address already registered")
    
    
    new_organizer = Organizer(
        locationId = organizer.locationId,
        campaignId = organizer.campaignId,
        name = organizer.name
    )
    
    try:
        db.add(new_organizer)
        db.commit()
        db.refresh(new_organizer)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_organizer
