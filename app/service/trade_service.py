from datetime import datetime
from app.service.market_service import get_price
from app.db.db import get_connection


def execute_trade(symbol: str, quantity: int):
    
    price = get_price(symbol)

    trade = {
        "symbol": symbol.upper(),
        "quantinty": quantity,
        "price": price,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "executed"

    }

    return trade