from fastapi import APIRouter, Depends
from ..utils.security_old import get_current_user

router = APIRouter(prefix="/booking_campaigns", tags=["booking_campaigns"])


@router.get("/booking_campaigns/")
def get_booking_campaigns(db: Session = Depends(get_db)):
    campaigns = db.query(BookingCampaign).all()
    return {"campaigns": campaigns}

@router.get("/booking_campaigns/{campaign_id}")
def get_booking_campaign(campaign_id: int, db: Session = Depends(get_db)):
    campaign = db.query(BookingCampaign).filter(BookingCampaign.bookingCampaignId == campaign_id).first()
    return {"campaign": campaign}
