"""
Trades API Router

Defines API endpoints for executing trades and retriving
trade history stored in the database.
"""
from fastapi import APIRouter
from app.service.trade_service import execute_trade, get_trades_by_symbol, get_all_trades

router = APIRouter()

@router.post("/trade/{symbol}")
def trade(symbol: str, quantity: int):
    """
    Execute a trade for a given stock symbol.

    Args:
        symbol (str): Stock ticker symbol (e.g., APPL, TSLA).
        quantity (int): Number of shares to trade.

    Returns:
        dict: Information about the executed trade including 
        symbol, quantity, price, timestamp, and status.
    """
    result = execute_trade(symbol, quantity)
    return result


@router.get("/trades")
def get_trades():
    """
    Retrive all executed trades.

    Returns:
        list[dict]: List of all trade records stored
        in the database.
    """
    return get_all_trades()

@router.get("/trades/{symbol}")
def get_symbol_trades(symbol: str):
    """
    Retrive all trade for a specific stock symbol.

    Args:
        symbol (str): Stock ticker symbol used to filter trades.

    Returns:
        list[dict]: List of trades associated with the symbol.
    """
    return get_trades_by_symbol(symbol)