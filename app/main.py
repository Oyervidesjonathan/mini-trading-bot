"""
Main Application Entry Point

This file initializes the FastAPI application and wires together
all major components of the system.

Responsibilities:
- Create FastAPI app instance
- Configure middleware (CORS)
- Initialize databse on startup
- Register API routes (routers)

This acts as the central hub of the backend.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import prices, trades, run
from app.db.db import init_db

# Initialize FastAPI application
app = FastAPI()

"""
CORS Middleware

Allows the React frontend (running on a different port)
to communicate with the FastAPI backend.

Without this, the browser would block requests due to cross-origin security policies.
"""
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

"""
Application Startup Event

Runs when the server starts.

Used here to initialize the database schema.
Ensures required tables exist before handling requests.
"""
@app.on_event("startup")
def startup():
    init_db()

app.include_router(prices.router)
app.include_router(trades.router)
app.include_router(run.router)

"""
Root Endpoint

Simple health check endpoint to verify the API is running.
Useful for debugging and deployment checks.
"""
@app.get("/")
def root():
    return {"message": "Mini Trading Bot API running"}