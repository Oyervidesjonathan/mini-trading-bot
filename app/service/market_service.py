import random

def get_price(symbo: str) -> float:
    base_prices = {
        "APPL": 180,
        "TSLA": 250,
        "NVDA": 900,
        "MSFT": 420
    }

    base = base_prices.get(symbol.upper(), 100)

    price = base + random.uniform(-5, 5)

    return round(price, 2)