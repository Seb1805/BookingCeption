from fastapi import APIRouter, Depends
from ..utils.security import get_current_user

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/{item_id}")
async def read_item(item_id: int, q: str | None = None, current_user: str = Depends(get_current_user)):
    return {"item_id": item_id, "q": q, "current_user": current_user}
