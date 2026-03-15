
"""
Database Utility Module

Provides helper functions for creating database connections 
and initializing the database schema for the Mini Trading Bot.
"""
import psycopg
import os

from app.config import DATABASE_URL

def get_connection():
    """
    Create and return a PostgreSQL database connection.

        Returns:
            psycopg.Connection: Acitve connection to the database
    """
    return psycopg.connect(DATABASE_URL)

def init_db():
    """
    Initializes the database schema.

    This function reads the sql schema file and executes it
    to create the required tables id they do not already exist.

    Returns:
        None
    """
    conn = get_connection()
    cursor = conn.cursor()

    with open("schema.sql", "r") as f:
        schema = f.read()

    cursor.execute(schema)

    conn.commit()
    cursor.close()
    conn.close()