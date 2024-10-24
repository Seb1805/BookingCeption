@router.get("/booking_statuses/")
def get_booking_statuses(db: Session = Depends(get_db)):
    statuses = db.query(BookingStatus).all()
    return {"statuses": statuses}

@router.get("/booking_statuses/{status_id}")
def get_booking_status(status_id: int, db: Session = Depends(get_db)):
    status = db.query(BookingStatus).filter(BookingStatus.bookingStatusId == status_id).first()
    return {"status": status}
