"""
Strategy Service Module

Contains trading strategy logic used to evaluate whether 
a stock should be bought, sold, or heald based on its price.
"""
from app.service.market_service import get_price

def evaluate_strategy(symbol: str):
    """
    Evaluate a simple trading strategy for a given symbol.

    The strategy determines whether to BUY, SELL, or HOLD
    based on the simulated price.

    Args:
        symbol (str): Stock ticker symbol (e.g., APPL, TSLA).

    Returns:
        dict: Strategy result containg:
            - symbol (str): Stock ticker symbol
            - price (float): Current sumulated price
            - decisiong (str): Trading decision (BUY, SELL, HOLD)
    """
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
