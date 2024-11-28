from fastapi import APIRouter, Depends
from ..utils.security import get_current_user
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Location,LocationCreate,LocationPydantic,LocationUpdate
from ..utils.security import get_current_user,  get_current_active_user
from fastapi import APIRouter, Depends, HTTPException, status


router = APIRouter(prefix="/locations", tags=["locations"])

@router.get("/")
def get_locations(db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    locations = db.query(Location).all()
    return {"locations": locations}

@router.get("/me")
def get_location(db: Session = Depends(get_db),  user: User = Depends(get_current_active_user)):
    try:
        query = text("""
                     SELECT  l."locationId", l."locationName", l."address", l."city"
                     from "Location" l
                     INNER JOIN "Organizer" o ON o."organizerId" = l."organizerId"
                     INNER JOIN "UserOrganizerAssosiation" oua ON oua."organizerId" = o."organizerId"
                     INNER JOIN "User" u ON u."userId" = oua."userId"
                     where u."email" = :email
                     """)

        print(query)
        # Execute query and fetch all results
        # Execute the query with the email parameter

        result = db.execute(query, {"email": user.email}).fetchall()
        # result = db.execute(query, {"dateEnd" : datetoday.strftime("%Y-%m-%d") }).offset(offsetcalc).limit(fetchamount)

        # Manually define the column names based on the SELECT query
        column_names = [
            "locationId", "locationName", "address", "city"
        ]

        # Convert the result (a list of Row objects) to a list of dictionaries
        location_list = [dict(zip(column_names, row)) for row in result]

        return {"locations": location_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/{location_id}")
def get_location(location_id: int, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    location = db.query(Location).filter(Location.locationId == location_id).first()
    return {"location": location}

@router.post("/", response_model=LocationCreate)
def createLocation(location: LocationCreate, db: Session = Depends(get_db),current_user: dict = Depends(get_current_user)):
    existing_location = db.query(Location).filter(Location.address == location.address).first()
    
    if existing_location:
        raise HTTPException(status_code=400, detail="Address already registered")
    
    
    new_location = Location(
        locationName = location.locationName,
        address = location.address,
        city = location.city,
        organizerId = location.organizerId
    )
    
    try:
        db.add(new_location)
        db.commit()
        db.refresh(new_location)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_location

@router.put("/{location_id}", response_model=LocationPydantic)
def update_campaign(location_id: int, campaign_data: LocationUpdate, db: Session = Depends(get_db)):
    existing_location = db.query(Location).filter(Location.locationId == location_id).first()
    
    if not existing_location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    # Update fields based on campaign_data
    for field in ["locationName","address","organizerId"]:
        setattr(existing_location, field, getattr(campaign_data, field, None))
    
    try:
        db.commit()
        db.refresh(existing_location)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_location

@router.delete("/{locationId}")
def delete_campaign(locationId: int, db: Session = Depends(get_db)):
    location = db.query(Location).filter(Location.locationId == locationId).first()
    
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    try:
        db.delete(location)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Location deleted successfully"}