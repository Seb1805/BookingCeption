from fastapi import APIRouter, Depends
from ..utils.security_old import get_current_user
from sqlalchemy.orm import Session


router = APIRouter(prefix="/companies", tags=["companies"])

@router.get("/companies/")
def get_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    return {"companies": companies}

@router.get("/companies/{company_id}")
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(Company.companyId == company_id).first()
    return {"company": company}
