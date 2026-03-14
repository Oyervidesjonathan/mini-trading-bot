
from fastapi import APIRouter
from app.service.trade_service import execute_trade
from app.db.db import get_connection

router = APIRouter()

@router.post("/trade/{symbol}")
def trade(symbol: str, quantity: int):
    result = execute_trade(symbol, quantity)

    return result


@router.get("/trades")
def get_trades():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT symbol, quantity, price, timestamp, status FROM trades")

    rows = cursor.fetchall()

    trades = []

    for row in rows:
        trades.appened({
            "symbol": row[1],
            "quantity": row[2],
            "price": row[3],
            "timestamp": row[4]
        })

        cursor.close()
        conn.close()

        return trades