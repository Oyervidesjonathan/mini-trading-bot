"""
Trade Service Module

This module contains the core business logic for:
- Executing trades
- Fetching trade history

It acts as the service layer between:
API routes (controllers) → Database

This separation keeps the application modular, testable, and scalable.
"""

from datetime import datetime
from app.service.market_service import get_price
from app.db.db import get_connection


def execute_trade(symbol: str, quantity: int):
    """
    Execute a simulated trade and persist it to the database.

    Workflow:
    1. Fetch current market price from market service
    2. Insert trade record into database
    3. Return structured trade response

    Args:
        symbol (str): Stock ticker (e.g., AAPL, TSLA)
        quantity (int): Number of shares

    Returns:
        dict: Executed trade details
    """

    # Step 1: Get current price from market service
    price = get_price(symbol)

    # Step 2: Establish database connection
    conn = get_connection()
    cursor = conn.cursor()

    # Step 3: Insert trade into database
    cursor.execute(
        """
        INSERT INTO trades (symbol, quantity, price, timestamp, status)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
        """,
        (symbol.upper(), quantity, price, datetime.utcnow(), "EXECUTED")
    )

    # Retrieve generated trade ID
    trade_id = cursor.fetchone()[0]

    # Commit transaction
    conn.commit()

    # Clean up resources
    cursor.close()
    conn.close()

    # Step 4: Return structured response
    return {
        "id": trade_id,
        "symbol": symbol.upper(),
        "quantity": quantity,
        "price": price,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "EXECUTED"
    }


def get_trades_by_symbol(symbol: str):
    """
    Retrieve all trades for a specific stock symbol.

    Args:
        symbol (str): Stock ticker

    Returns:
        list[dict]: Trades filtered by symbol (newest first)
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

    # Transform raw DB rows → structured JSON response
    trades = [
        {
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": row[3],
            "timestamp": row[4],
            "status": row[5]
        }
        for row in rows
    ]

    return trades


def get_all_trades():
    """
    Retrieve all trades stored in the database.

    Returns:
        list[dict]: All trades ordered by most recent first
    """

    conn = get_connection()
    cursor = conn.cursor()

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

    # Convert DB rows into JSON-friendly dictionaries
    trades = [
        {
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": row[3],
            "timestamp": row[4],
            "status": row[5]
        }
        for row in rows
    ]

    return trades