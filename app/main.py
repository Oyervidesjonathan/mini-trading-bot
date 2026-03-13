from fastapi import FastAPI
from app.api import prices

app = FastAPI(title="Mini Trading Bot")

app.include_router(prices.router)

@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}