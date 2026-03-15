
"""
Prices API Router

Provides API endpoints for retriving simulated stock prices.
This router connects the HTTP request layer to the market service
responsible for generating market price data.
"""

from fastapi import APIRouter
from app.service.market_service import get_price

router = APIRouter()

@router.get("/prices/{symbol}", summary="Get stock price")
def get_stock_price(symbol: str):

    """
    Retrive the current simulated price for a stock symbol.

    Args:
        symbol (str): Stock ticker symbol (e.g., APPL, TSLA).

    Returns:
        dict: JSON response containing the stock symbol and
        the simulated price.
    """
    price = get_price(symbol)

    return {
        "symbol": symbol.upper(),
        "price": price
    }