from fastapi import APIRouter

router = APIRouter()

@router.post("/trade/{symbol}")
def trade(symbol: str, quantity: int):
    result = execute_trade(symbol, quantity)

    return result