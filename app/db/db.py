
import psycopg
import os

from app.config import DATABASE_URL

def get_connection():
    return psycopg.connect(DATABASE_URL)

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    with open("schema.sql", "r") as f:
        schema = f.read()

    cursor.execute(schema)

    conn.commit()
    cursor.close()
    conn.close()