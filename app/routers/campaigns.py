from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security import get_current_user
from ..models import Campaign,CampaignPydantic,CampaignCreate,CampaignUpdate
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/campaign", tags=["campaign"])


@router.get("/")
def get_campaigns(db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).all()
    return {"campaigns": campaigns}

@router.get("/{campaign_id}")
def get_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.campaignId == campaign_id).first()
    return {"campaign": campaign}

@router.post("/", response_model=CampaignPydantic)
def create_campaign(campaign: CampaignCreate, db: Session = Depends(get_db)):
    new_campaign = Campaign(
        name=campaign.name,
        description=campaign.description,
        coverImage=campaign.coverImage,
        dateStart=campaign.dateStart,
        timeStart=campaign.timeStart,
        dateEnd=campaign.dateEnd,
        timeEnd=campaign.timeEnd,
        sectionId=campaign.sectionId,
        price=campaign.price
    )
    
    try:
        db.add(new_campaign)
        db.commit()
        db.refresh(new_campaign)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_campaign

@router.put("/{campaign_id}", response_model=CampaignPydantic)
def update_campaign(campaign_id: int, campaign_data: CampaignUpdate, db: Session = Depends(get_db)):
    existing_campaign = db.query(Campaign).filter(Campaign.campaignId == campaign_id).first()
    
    if not existing_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Update fields based on campaign_data
    for field in ["name", "description", "coverImage", "dateStart", "timeStart", "dateEnd", "timeEnd", "sectionId", "price"]:
        setattr(existing_campaign, field, getattr(campaign_data, field, None))
    
    try:
        db.commit()
        db.refresh(existing_campaign)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_campaign

@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(Campaign.campaignId == campaign_id).first()
    
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    try:
        db.delete(campaign)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Campaign deleted successfully"}
