"""
Mini Trading Bot API

Application entry point for te FastAPI server.

This module inititializes the FastAPI application, sets up
API routers, and ensures the database schema is intialized
whenthe server starts.
"""
from fastapi import FastAPI
from app.api import prices, trades, run
from app.db.db import init_db

app = FastAPI(title="Mini Trading Bot")

@app.on_event("startup")
def startup():
    """
    Initialize the databse schema when the application starts.
    """
    init_db()

app.include_router(prices.router)
app.include_router(trades.router)
app.include_router(run.router)

@app.get("/")
def root():
    """
    Root endpoint to confirm the API is running.

    Returns:
        dict: Basic message confirming the API is active
    """
    return {"message": "Mini Trading Bot API running"}

@app.get("/health")
def health():
    """
    Health check endpoint used to verify the API is operational.

    Returns:
        dict: Service health status.
    """
    return {"status": "ok"}