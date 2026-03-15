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