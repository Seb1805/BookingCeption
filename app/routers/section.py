from ..models import Section,SectionCreate,SectionUpdate,SectionPydantic
from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security import get_current_user
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/sections", tags=["sections"])

@router.get("/")
def get_tickets(db: Session = Depends(get_db)):
    sections = db.query(Section).all()
    return {"sections": sections}

@router.get("/{sectionId}")
def get_ticket(sectionId: int, db: Session = Depends(get_db)):
    section = db.query(Section).filter(Section.sectionId == sectionId).first()
    return {"section": section}

@router.post("/", response_model=SectionPydantic)
def create_section(section: SectionCreate, db: Session = Depends(get_db)):
    new_section = Section(
        sectionId=section.sectionId,
        locationId=section.locationId,
        name=section.name,
        roomForParticipants=section.roomForParticipants
    )
    
    try:
        db.add(new_section)
        db.commit()
        db.refresh(new_section)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_section

@router.put("/{section_id}", response_model=SectionPydantic)
def update_section(section_id: int, section_data: SectionUpdate, db: Session = Depends(get_db)):
    existing_section = db.query(Section).filter(Section.sectionId == section_id).first()
    
    if not existing_section:
        raise HTTPException(status_code=404, detail="Section not found")
    
    # Update fields based on section_data
    for field in ["locationId", "locationItem", "name", "spotId", "roomForParticipants"]:
        setattr(existing_section, field, getattr(section_data, field, None))
    
    try:
        db.commit()
        db.refresh(existing_section)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_section

@router.delete("/{section_id}")
def delete_section(section_id: int, db: Session = Depends(get_db)):
    section = db.query(Section).filter(Section.sectionId == section_id).first()
    
    if not section:
        raise HTTPException(status_code=404, detail="Section not found")
    
    try:
        db.delete(section)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Section deleted successfully"}
