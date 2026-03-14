from fastapi import FastAPI
from app.api import prices, trades, run

app = FastAPI(title="Mini Trading Bot")

app.include_router(prices.router)
app.include_router(trades.router)
app.include_router(run.router)

@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}