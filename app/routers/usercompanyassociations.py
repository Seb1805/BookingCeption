from ..models import Company,User,CompanyCreate


@router.get("/user_company_associations/")
def get_user_company_associations(db: Session = Depends(get_db)):
    associations = db.query(UserCompanyAssosiation).all()
    return {"associations": associations}

@router.get("/user_company_associations/{association_id}")
def get_user_company_association(association_id: int, db: Session = Depends(get_db)):
    association = db.query(UserCompanyAssosiation).filter(UserCompanyAssosiation.userCompanyAssosiationId == association_id).first()
    return {"association": association}
