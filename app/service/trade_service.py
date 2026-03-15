from datetime import datetime
from app.service.market_service import get_price
from app.db.db import get_connection


def execute_trade(symbol: str, quantity: int):
    
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

    cursor.closed()
    conn.close()

    trades = []

    for row in rows: 
        trades.appened({
            "id": row[0],
            "symbol": row[1],
            "quantity": row[2],
            "price": row[3],
            "timestamp": row[4],
            "status": row[5]

        })

    return trades