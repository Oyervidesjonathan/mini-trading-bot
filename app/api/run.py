
from fastapi import APIRouter
from app.service.strategy_service import evaluate_strategy


router = APIRouter()

@router.get("/strategy/{symbol}")
def run_startegy(symbol: str):
    result = evalute_strategy(symbol)

    return result
