"""
Trade Service Module

Handles:
- Executing trades
- Fetching trade history
"""

from datetime import datetime
from app.service.market_service import get_price
from app.db.db import get_connection


def execute_trade(symbol: str, quantity: int, user_id: int = 7):
    """
    Execute a simulated trade and persist it to the database.
    """

    price = get_price(symbol)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO trades (user_id, symbol, quantity, price, side, timestamp)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
        """,
        (user_id, symbol.upper(), quantity, price, "BUY", datetime.utcnow())
    )

    trade_id = cursor.fetchone()[0]

    conn.commit()
    cursor.close()
    conn.close()

    return {
        "id": trade_id,
        "symbol": symbol.upper(),
        "quantity": quantity,
        "price": price,
        "side": "BUY",
        "timestamp": datetime.utcnow().isoformat()
    }


def get_trades_by_symbol(symbol: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, symbol, quantity, price, timestamp, side
        FROM trades
        WHERE symbol = %s
        ORDER BY id DESC
        """,
        (symbol.upper(),)
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": float(row[3]),
            "timestamp": row[4],
            "side": row[5]
        }
        for row in rows
    ]


def get_all_trades():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, symbol, quantity, price, timestamp, side
        FROM trades
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": float(row[3]),
            "timestamp": row[4],
            "side": row[5]
        }
        for row in rows
    ]