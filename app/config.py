"""
Application Configuration Module

Loads enviorment variables used by the application.
This module provides access to configuration values such 
as the databse connection string.
"""
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")