from sqlalchemy.sql import select

async def get_user(db, username: str):
    statement = select(User).where(User.username == username)
    result = db.execute(statement)
    return result.scalar_one_or_none()

async def authenticate_user(db, username: str, password: str):
    user = await get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

async def create_user(db, user: User):
    db.add(user)
    db.commit()
