from datetime import datetime
from app.service.market_service import get_price
from app.db.db import get_connection


def execute_trade(symbol: str, quantity: int):
    
    price = get_price(symbol)

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO trades (symbol, quantity, price, timestamp)
        VALUES(%s, %s, %s, %s)
        RETURNING id
        """,
        (symbol.upper(), quantity, price, datetime.utcnow())
    )

    trade_id = cursor.fetchone()[0]

    con.commit()
    cursor.close()
    conn.close()

    trade = {
        "symbol": symbol.upper(),
        "quantinty": quantity,
        "price": price,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "executed"

    }

    return trade