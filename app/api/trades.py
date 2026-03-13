from fastapi import APIRouter

router = APIRouter()

@router.post("/trade/{symbol}")
def execute_trade(symbol: str, quantity: int):
    return{
        "symbol": symbol.upper(),
        "quantity": quantity,
        "status": "trade executed (simulated)"
    }