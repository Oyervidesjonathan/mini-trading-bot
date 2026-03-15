
"""
Trade Data Model

Defines the structure used to represent a trade within 
the Mini Trading Bot application. This model is used 
to organize trade data retrived from or stored in the database. 
"""
from dataclasses import dataclass
from datetime import datetime

@dataclass
class Trade:
    """
    Represents a single execution trade.

    Attributes:
        symbol (str): Stock ticker symbol(e.g., AAPL, TSLA).
        quantity (int): Number off shares traded.
        price (float): Price per share at the time of the trade.
        timestamp (datetime): Time whe the trade occured.
        status (str): Current trade status (e.g., FILLED, PENDING).

    """
    symbol: str
    quantity:int
    price: float
    timestamp: datetime
    status: str

