from fastapi import FastAPI
from app.api import prices, trades

app = FastAPI(title="Mini Trading Bot")

app.include_router(prices.router)
app.include_router(trades.router)

@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}