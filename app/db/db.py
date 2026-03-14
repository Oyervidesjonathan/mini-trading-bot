
import psycopg
import os

from app.config import DATABASE_URL

def get_connection():
    database_url = os.getenv("DATABASE_URL")

    conn = psycopg.connect(DATABASE_URL)

    return conn