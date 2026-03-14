
import psycopg
import os

def get_connection():
    database_url = os.getenv("DATABASE_URL")

    conn = psycopg.connect(DATABASE_URL)

    return conn