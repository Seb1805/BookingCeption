from fastapi import FastAPI
from .routers import read_item, skrald, users,token,locations, bookings, campaigns, section, ticket, spot, organizers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(read_item.router)
app.include_router(skrald.router)
app.include_router(users.router)
app.include_router(token.router)
app.include_router(locations.router)
app.include_router(bookings.router)
app.include_router(campaigns.router)
app.include_router(section.router)
app.include_router(spot.router)
app.include_router(ticket.router)
app.include_router(organizers.router)

origins = [
    "http://localhost:3000",  # React Native Metro bundler port
    "http://127.0.0.1:3000",
    "http://192.168.1.100:3000",  # Android device IP
    "http://10.0.2.15:3000",     # iOS simulator IP
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}
