from fastapi import APIRouter
from app.service.market_service import get_price

router = APIRouter()

@router.get("/prices/{symbol}")
def get_stock_price(symbol: str):
    price = get_price(symbol)

    return {
        "symbol": symbol.upper(),
        "price": price
    }