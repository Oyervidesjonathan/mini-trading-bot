"""
Strategy API router

Provides API endpoints for evaluating trading startegies
and optionally executing trades based on strategy decisions.
"""

from fastapi import APIRouter
from app.service.strategy_service import evaluate_strategy


router = APIRouter()

@router.get("/strategy/{symbol}", summary="Evaluate trading startegy")
def run_startegy(symbol: str):
    """
    Evaluate the trading strategy for a given stock symbol.

    Args:
        symbol (str): Stock ticker symbol (e.g., APPL, TSLA).

    Returns: 
        dict: Strategy evaluation containing the symbol, 
        current price, and trading decision (BUY, SELL, HOLD)
    """
    result = evaluate_strategy(symbol)

    return result

@router.post("/bot/run/{symbol}")
def run_bot(symbol: str, quantity: int = 1):
    """
    Run the trading bot for a specific symbol and optionally
    execute a trade if the strategy recomds BUY.

    Args:
        symbol(str): Stock ticker symbol.
        quantity (int): Number of shares to trade (deafult is 1).

    Returns:
        dict: Strategy results and trade execution information.
        If the startegy signals BUY, a trade will be executed.
    """

    strategy_result = evaluate_strategy(symbol)

    if strategy_result["decision"] == "BUY":
        trade_results = execute_trade(symbol, quantity)

        return {
            "symbol": strategy_result["symbol"],
            "price": strategy_result["price"],
            "decision": strategy_result["decision"],
            "trade_executed": True,
            "trade": trade_result
        }

    return{
        "symbol": strategy_result["symbol"],
        "price": strategy_result["price"],
        "decision": strategy_result["decision"],
        "trade_executed": False,
        "trade": None
    }
