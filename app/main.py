from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import prices, trades, run
from app.db.db import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

app.include_router(prices.router)
app.include_router(trades.router)
app.include_router(run.router)

@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}