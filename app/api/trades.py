
from fastapi import APIRouter
from app.service.trade_service import execute_trade, get_trades_by_symbol, get_all_trades

router = APIRouter()

@router.post("/trade/{symbol}")
def trade(symbol: str, quantity: int):
    result = execute_trade(symbol, quantity)
    return result


@router.get("/trades")
def get_trades():
    return get_all_trades()

@router.get("/trades/{symbol}")
def get_symbol_trades(symbol: str):
    return get_trades_by_symbol(symbol)