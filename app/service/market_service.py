"""
Market Service Module

Provides simulated market price data used by the trading 
strategy and trade execution services.
"""
import random

def get_price(symbol: str) -> float:
    """
    Simulate retriving a market price for a stock symbol. 

    A base price is assigned to know symbols and a small 
    random fluctuation is applied to simulate market movement.

    Args:
        symbol (str): Stock ticker symbol (e.g., APPL, TSLA).

    Returns:
        float: Simulated stock price rounded to two decimals.
    """
    base_prices = {
        "AAPL": 180,
        "TSLA": 250,
        "NVDA": 900,
        "MSFT": 420
    }

    base = base_prices.get(symbol.upper(), 100)

    price = base + random.uniform(-5, 5)

    return round(price, 2)