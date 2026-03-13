import random

def get_price(symbol: str) -> float:
    base_prices = {
        "AAPL": 180,
        "TSLA": 250,
        "NVDA": 900,
        "MSFT": 420
    }

    base = base_prices.get(symbol.upper(), 100)

    price = base + random.uniform(-5, 5)

    return round(price, 2)