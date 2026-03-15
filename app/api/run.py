
from fastapi import APIRouter
from app.service.strategy_service import evaluate_strategy


router = APIRouter()

@router.get("/strategy/{symbol}")
def run_startegy(symbol: str):
    result = evaluate_strategy(symbol)

    return result

@router.post("/bot/run/{symbol}")
def run_bot(symbol: str, quantity: int = 1):

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
