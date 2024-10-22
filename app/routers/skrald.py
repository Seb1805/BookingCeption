from fastapi import APIRouter
from ..utils.security import get_current_user

router = APIRouter(prefix="/skrald", tags=["skrald"])

@router.get("/")
async def read_skrald(current_user: str = Depends(get_current_user)):
    return {
        "Skrald": "Dette er en kæmpe liste fyldt med ugenbrugeligt affald",
        "0": ["Skrald", "Skrald", "Skrald", "Skrald", "Skrald", "Skrald", "Skrald"],
        "current_user": current_user
    }
