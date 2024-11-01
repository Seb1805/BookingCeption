from ..models import Spot,SpotCreate,SpotUpdate,SpotPydantic
from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security import get_current_user
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/spot", tags=["spot"])

@router.get("/")
def get_tickets(db: Session = Depends(get_db)):
    spots = db.query(Spot).all()
    return {"spots": spots}

@router.get("/{spotId}")
def get_ticket(spotId: int, db: Session = Depends(get_db)):
    spot = db.query(Spot).filter(Spot.spotId == spotId).first()
    return {"spot": spot}

@router.post("/", response_model=SpotPydantic)
def create_spot(spot: SpotCreate, db: Session = Depends(get_db)):
    new_spot = Spot(
        status=spot.status,
        position=spot.position,
        lengthCM=spot.lengthCM,
        widthCM=spot.widthCM,
        priceExtra=spot.priceExtra,
        pricePrSquareMeter=spot.pricePrSquareMeter,
        spotType=spot.spotType
    )
    
    try:
        db.add(new_spot)
        db.commit()
        db.refresh(new_spot)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_spot

@router.put("/{spot_id}", response_model=SpotPydantic)
def update_spot(spot_id: int, spot_data: SpotUpdate, db: Session = Depends(get_db)):
    existing_spot = db.query(Spot).filter(Spot.spotId == spot_id).first()
    
    if not existing_spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    
    # Update fields based on spot_data
    for field in ["status", "position", "lengthCM", "widthCM", "priceExtra", "pricePrSquareMeter", "spotType"]:
        setattr(existing_spot, field, getattr(spot_data, field, None))
    
    try:
        db.commit()
        db.refresh(existing_spot)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_spot

@router.delete("/{spot_id}")
def delete_spot(spot_id: int, db: Session = Depends(get_db)):
    spot = db.query(Spot).filter(Spot.spotId == spot_id).first()
    
    if not spot:
        raise HTTPException(status_code=404, detail="Spot not found")
    
    try:
        db.delete(spot)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Spot deleted successfully"}
