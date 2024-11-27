from fastapi import APIRouter, Depends, HTTPException, status
from ..utils.security_old import get_current_user
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Booking,BookingCreate,BookingPydantic,BookingUpdate,User, BookingCampaign, Ticket, Section, Location, Campaign, Spot,BookingExtendedPydantic,BookingExtendedCreate
from ..utils.security import get_current_active_user
from datetime import date
from sqlalchemy.sql import text
import datetime




router = APIRouter(prefix="/bookings", tags=["bookings"])
@router.get("/")
def get_bookings(db: Session = Depends(get_db)):
    bookings = db.query(Booking).all()
    return {"bookings": bookings}

@router.get("/bought_tickets")
def get_bought_tickets(db: Session = Depends(get_db), user: User = Depends(get_current_active_user)):
    try:
        query = text("""
            SELECT t."name", t."validDateStart", t."validDateEnd",
                   t."validTimeStart", s."name" AS section_name,
                   l."address", c."campaignId", c."coverImage",
                   sp."spotnumber"
            FROM "User" u
            INNER JOIN "Booking" b ON b."userId" = u."userId"
            INNER JOIN "BookingCampaign" bc ON bc."bookingid" = b."bookingId"
            INNER JOIN "Ticket" t ON t."TicketId" = bc."ticketId"
            INNER JOIN "Section" s ON s."sectionId" = t."sectionId"
            INNER JOIN "Location" l ON l."locationId" = s."locationId"
            LEFT JOIN "Spot" sp ON sp."spotId" = t."spotId"
            INNER JOIN "Campaign" c ON c."sectionId" = s."sectionId"
            WHERE u."email" = :email
        """)
        print(query)
        # Execute query and fetch all results
        # Execute the query with the email parameter
        result = db.execute(query, {"email": user.email}).fetchall()

        # Manually define the column names based on the SELECT query
        column_names = [
            "name", "validDateStart", "validDateEnd", "validTimeStart", 
            "section_name", "address", "campaignId", "coverImage", "spotnumber"
        ]

        # Convert the result (a list of Row objects) to a list of dictionaries
        tickets_list = [dict(zip(column_names, row)) for row in result]

        return {"bought_tickets": tickets_list}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@router.get("/{booking_id}")
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.bookingId == booking_id).first()
    return {"booking": booking}

@router.post("/", response_model=BookingPydantic)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db),current_user: User = Depends(get_current_active_user)):


    #Skip check for existing for now
    #     
    #existing_booking = db.query(Booking).filter(Booking.email == booking.email).first()
    
    # if existing_booking:
    #     raise HTTPException(status_code=400, detail="Email already registered")
    
    new_booking = Booking(
        userId=current_user.userId,
        bookingStatusId=booking.bookingStatusId,
        dateCreated=booking.dateCreated
    )

    try:
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    

    return new_booking


@router.put("/{booking_id}", response_model=None)
def update_booking(booking_id: int, booking_data: BookingUpdate, db: Session = Depends(get_db)):
    existing_booking = db.query(Booking).filter(Booking.bookingId == booking_id).first()
    
    if not existing_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Update fields based on booking_data
    for field in ["userId", "bookingStatusId", "bookingCampaignId"]:
        setattr(existing_booking, field, getattr(booking_data, field))
    
    try:
        db.commit()
        db.refresh(existing_booking)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return existing_booking

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.bookingId == booking_id).first()
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    try:
        db.delete(booking)
        db.commit()
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
    
    return {"message": "Booking deleted successfully"}



@router.post("/order", response_model=None)
def create_booking_order(booking_data: BookingExtendedCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    try:
        # Validate booking data
        if not booking_data.bookingStatusId:
            raise HTTPException(status_code=400, detail="Booking status ID is required")
        
        # Create a new booking entry
        new_booking = Booking(
            userId=current_user.userId,
            bookingStatusId=booking_data.bookingStatusId,
            dateCreated=booking_data.dateCreated

        )
        print(new_booking)
        print('hello')
        print(new_booking.bookingId)

        # Add the new booking to the database
        db.add(new_booking)
        
        # Create BookingCampaign entries
        for campaign in booking_data.bookingCampaigns:
            ticket_id = campaign['ticketId']
            ticket_amount = campaign['ticketAmount']
            
            print(f'ticket: {ticket_id}')
            # Check if the ticket exists
            db_ticket = db.query(Ticket).filter(Ticket.ticketId == ticket_id).first()
            if not db_ticket:
                raise HTTPException(status_code=400, detail=f"Ticket with ID {ticket_id} does not exist")
            print(f'i am ticket {db_ticket}')
            bId = new_booking.bookingId
            sum = db_ticket.price * ticket_amount
            print(f'i am sum {sum}')
            print(f'booking: {bId}')
            # Create a new BookingCampaign entry
            new_campaign = BookingCampaign(
                ticketId=ticket_id,
                ticketAmount=ticket_amount,
                sumPrice=sum,
                bookingId=bId  # Use the newly created booking's id
            )

            print(new_campaign)
            db.add(new_campaign)
        
        # Commit all changes
        db.commit()
        
        # Refresh the booking to get the newly created bookingId
        db.refresh(new_booking)
        
        return new_booking
        
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred while creating the booking order: {str(e)}")


