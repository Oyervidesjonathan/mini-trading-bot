
from app.service.market_service import get_price

def evaluate_strategy(symbol: str):
    price = get_price(symbol)

    if price < 100:
        decision = "BUY"
    elif price > 300:
        decision = "SELL"
    else:
        decision= "HOLD"

    return {
        "symbol": symbol.upper(),
        "price": price,
        "decision": decision
    }
