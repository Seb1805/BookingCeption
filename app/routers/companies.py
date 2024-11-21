from fastapi import APIRouter, Depends,HTTPException
from ..utils.security_old import get_current_user
from sqlalchemy.orm import Session
from ..models import Company,User,CompanyCreate
from ..database import get_db



router = APIRouter(prefix="/companies", tags=["companies"])

@router.get("/")
def get_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    return {"companies": companies}

@router.get("/{company_id}")
def get_company(company_id: int, db: Session = Depends(get_db), User : User = get_current_user()):
    company = db.query(Company).filter(Company.companyId == company_id).first()
    return {"company": company}


@router.post("/")
def create_company(company: CompanyCreate,db: Session = Depends(get_db)):
    new_company = Company(
        name = company.name,
        address = company.address,
        logo = company.logo,
        CVR = company.CVR
    )

    try:
        db.add(new_company)
        db.commit()
        db.refresh(new_company)
    except Exception as e:
        db.rollback()
        print(str(e))
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")