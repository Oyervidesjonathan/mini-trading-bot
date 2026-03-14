from datetime import datetime

def execute_trade():
    trade = {
        "symbol": symbol.upper(),
        "quantinty": quantity,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "executed"

    }

    return trade