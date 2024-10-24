@router.get("/organizers/")
def get_organizers(db: Session = Depends(get_db)):
    organizers = db.query(Organizer).all()
    return {"organizers": organizers}

@router.get("/organizers/{organizer_id}")
def get_organizer(organizer_id: int, db: Session = Depends(get_db)):
    organizer = db.query(Organizer).filter(Organizer.organizerId == organizer_id).first()
    return {"organizer": organizer}
