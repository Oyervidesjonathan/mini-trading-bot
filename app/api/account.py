from fastapi import APIRouter
from app.db.db import get_connection

router = APIRouter()

@router.get("/account/{user_id}")
def get_account(user_id: int):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT balance FROM portfolios WHERE user_id = %s",
        (user_id,)
    )
    balance = cursor.fetchone()

    cursor.execute(
        "SELECT symbol, quantity FROM positions WHERE user_id = %s",
        (user_id,)
    )
    positions = cursor.fetchall()

    cursor.execute(
        """
        SELECT symbol, price
        FROM trades
        WHERE user_id = %s
        ORDER BY timestamp DESC
        LIMIT 1
        """,
        (used_id)
    )
    last_trade = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        "balance": balance[0] if balance else 0,
        "positions": positions,
        "last_trade": last_trade
    }

    
