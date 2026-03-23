"""
Trade Service Module

Handles buisness logic for executing trades abd retrieving
trade history from the database.
"""
from datetime import datetime
from app.service.market_service import get_price
from app.db.db import get_connection


def execute_trade(symbol: str, quantity: int):
    """
    Execute a simulated trade and store it in the database.

    Args:
        symbol (str): Stock ticker symbol (e.g., APPL, TSLA).
        quantity (int): Number of shares to trade.

    Returns:
        dict: Information about the executed trade including 
        id, symbol, quantity, price, timestamp, and status.
    """
    
    price = get_price(symbol)
    timestamp = datetime.utcnow()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO trades (symbol, quantity, price, timestamp, status)
        VALUES(%s, %s, %s, %s, %s)
        RETURNING id
        """,
        (symbol.upper(), quantity, price, datetime.utcnow(), "EXECUTED")
    )

    trade_id = cursor.fetchone()[0]

    conn.commit()
    cursor.close()
    conn.close()

    trade = {
        "id": trade_id,
        "symbol": symbol.upper(),
        "quantity": quantity,
        "price": price,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "EXECUTED"

    }

    return trade

def get_trades_by_symbol(symbol: str):
    """
    Retrive all trades associated witha specific stock symbol.

    Args:
        symbol (str): Stock ticker symbol used to filter trades.

    Returns:
        list[dict]: List of trades matching symbol,
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT id, symbol, quantity, price, timestamp, status 
        FROM trades 
        WHERE symbol = %s 
        ORDER BY id DESC
        """,
        (symbol.upper(),)
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    trades = []

    for row in rows: 
        trades.append({
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": row[3],
            "timestamp": row[4],
            "status": row[5]

        })

    return trades

def get_all_trades():
    """
    Retrive all trades stored in the database.

    Returns:
        list[dict]: List of all executed trades ordered
        from newest to oldest
    """

    conn = get_connection()
    cursor = conn.cursor()

    trades = []

    cursor.execute(
        """
        SELECT id, symbol, quantity, price, timestamp, status
        FROM trades
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    for row in rows:
        trades.append({
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": row[3],
            "timestamp": row[4],
            "status": row[5]
        })

    return trades