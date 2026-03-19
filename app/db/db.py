"""
Database Utility Module

Provides helper functions for:
- Establishing PostgreSQL connections
- Initializing the database schema

This module abstracts database setup logic away from the rest
of the application, allowing the service layer to remain clean
and focused on business logic.
"""

import psycopg
from app.config import DATABASE_URL


def get_connection():
    """
    Create and return a PostgreSQL database connection.

    Uses the DATABASE_URL from configuration to connect
    to the database. Autocommit is disabled to allow
    explicit transaction control.

    Returns:
        psycopg.Connection: Active database connection
    """
    return psycopg.connect(DATABASE_URL, autocommit=False)


def init_db():
    """
    Initialize the database schema.

    Reads the SQL schema file and executes it to create
    required tables if they do not already exist.

    This function is typically called once at application startup.

    Returns:
        None
    """
    conn = get_connection()
    cursor = conn.cursor()

    # Load schema from file
    with open("schema.sql", "r") as f:
        schema = f.read()

    # Execute schema (CREATE TABLE statements, etc.)
    cursor.execute(schema)

    # Commit changes to database
    conn.commit()

    # Clean up resources
    cursor.close()
    conn.close()