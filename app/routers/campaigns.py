from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security import get_current_user
from ..models import Campaign,CampaignPydantic,CampaignCreate,CampaignUpdate
from ..database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
import datetime

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("/")
def get_campaigns(db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).all()
    return {"campaigns": campaigns}

@router.get("/page/{campaign_page}")
def get_campaigns_chunk(campaign_page: int,  db: Session = Depends(get_db)):
    fetchamount = 20
    try:
        query = text("""
                     SELECT c."campaignId", c."name", min(t."price"), c."coverImage"
                     from "Campaign" c
                     INNER JOIN "Ticket" t ON t."campaignId" = c."campaignId"
                     where c."dateStart" > :customDateStart
                     group by c."name", c."campaignId", c."coverImage"
                     """)

        print(query)
        # Execute query and fetch all results
        # Execute the query with the email parameter
        offsetcalc = campaign_page * fetchamount
        datetoday = datetime.datetime.now()

        result = db.execute(query, {"customDateStart" : datetoday.strftime("%Y-%m-%d") }).fetchall()
        # result = db.execute(query, {"dateEnd" : datetoday.strftime("%Y-%m-%d") }).offset(offsetcalc).limit(fetchamount)

        # Manually define the column names based on the SELECT query
        column_names = [
            "id", "name", "price", "coverImage"
        ]

        # Convert the result (a list of Row objects) to a list of dictionaries
        campaigns_list = [dict(zip(column_names, row)) for row in result]

        return {"campaigns": campaigns_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

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
        active=campaign.active
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
