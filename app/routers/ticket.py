from ..models import Ticket,TicketCreate,TicketUpdate,TicketPydantic
from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security import get_current_user

from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.get("/")
def get_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()
    return {"tickets": tickets}

@router.get("/{ticket_id}")
def get_ticket(ticketId: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.ticketId == ticketId).first()
    return {"ticket": ticket}

@router.post("/", response_model=TicketPydantic)
def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    new_ticket = Ticket(
        name=ticket.name,
        price=ticket.price,
        validDateStart=ticket.validDateStart,
        validDateEnd=ticket.validDateEnd,
        validTimeStart=ticket.validTimeStart,
        spotId=ticket.spotId,
        campaignId=ticket.campaignId
    )
    
    try:
        db.add(new_ticket)
        db.commit()
        db.refresh(new_ticket)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return new_ticket

@router.put("/{ticket_id}", response_model=TicketPydantic)
def update_ticket(ticket_id: int, ticket_data: TicketUpdate, db: Session = Depends(get_db)):
    existing_ticket = db.query(Ticket).filter(Ticket.ticketId == ticket_id).first()
    
    if not existing_ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    # Update fields based on ticket_data
    for field in ["name", "price", "validDateStart", "validDateEnd", "validTimeStart", "spotId", "campaignId"]:
        setattr(existing_ticket, field, getattr(ticket_data, field, None))
    
    try:
        db.commit()
        db.refresh(existing_ticket)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_ticket

@router.delete("/{ticket_id}")
def delete_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.ticketId == ticket_id).first()
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    try:
        db.delete(ticket)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Ticket deleted successfully"}
