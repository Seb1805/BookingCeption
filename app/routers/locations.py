from fastapi import APIRouter, Depends
from ..utils.security import get_current_user
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Location,LocationCreate
from ..utils.security import get_current_user
from fastapi import APIRouter, Depends, HTTPException, status


router = APIRouter(prefix="/location", tags=["location"])

@router.get("/")
def get_locations(db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    locations = db.query(Location).all()
    return {"companies": locations}

@router.get("/{location_id}")
def get_location(company_id: int, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    company = db.query(Location).filter(Location.companyId == company_id).first()
    return {"company": company}

@router.post("/", response_model=LocationCreate)
def createLocation(location: LocationCreate, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    existing_location = db.query(Location).filter(Location.address == location.address).first()
    
    if existing_location:
        raise HTTPException(status_code=400, detail="Address already registered")
    
    
    new_location = Location(
        locationName = location.locationName,
        address = location.address
    )
    
    try:
        db.add(new_location)
        db.commit()
        db.refresh(new_location)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_location