
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Trade:
    symbol: str
    quantity:int
    price: float
    timsestamp: datetime
    status: str

