from fastapi import FastAPI
from .routers import read_item, skrald,users

app = FastAPI()

app.include_router(read_item.router)
app.include_router(skrald.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
