
import psycopg
import os

def get_connection():
    database_url = os.getenv("DATABASE_URL")

    conn = psycopg.connect(database_url)

    return conn