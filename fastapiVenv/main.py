from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/skrald")
def read_item():
    return{
    "Skrald" : "Dette er en kæmpe liste fyldt med ugenbrugeligt affald",
    "0" : ["Skrald", "Skrald", "Skrald", "Skrald", "Skrald", "Skrald", "Skrald"]  }