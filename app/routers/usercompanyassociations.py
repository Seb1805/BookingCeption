from ..models import UserCompanyAssociation,UserCompanyAssociationCreate
from ..database import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(prefix="/user_company_associations", tags=["user_company_associations"])



@router.get("/")
def get_user_company_associations(db: Session = Depends(get_db)):
    associations = db.query(UserCompanyAssociation).all()
    return {"associations": associations}

@router.get("/user_company_associations/{association_id}")
def get_user_company_association(association_id: int, db: Session = Depends(get_db)):
    association = db.query(UserCompanyAssociation).filter(UserCompanyAssociation.userCompanyAssosiationId == association_id).first()
    return {"association": association}

@router.post("/")
def create_user_company_associations(user_company_associations : UserCompanyAssociationCreate,db: Session = Depends(get_db)):
    new_user_company_associations = UserCompanyAssociation(
        userId = user_company_associations.userId,
        companyId = user_company_associations.companyId
    )

    try:
        db.add(new_user_company_associations)
        db.commit()
        db.refresh(new_user_company_associations)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
