/**
 * Controls component
 * 
 * This component handles all user interactions for the trading app.
 * It collects user input (symbol + quantity) and triggers API calls
 * through the client layer.
 * 
 * Responsibilities:
 * - Mange local UI sate (symbol, quantity)
 * - Trigger backend requests
 * - Handle async responses + errors
 * - Send formatted ouput back to parent component (app.jsx)
 */
import { useState } from "react"
import {
  getPrice,
  runStrategy,
  executeTrade,
  runBot,
  getTrades
} from "../api/client";

function Controls({ setOutput, setLoading }) {
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState(1);

  const handle = async (fn) => {
    if (!symbol) {
      setOutput("⚠️ Enter a symbol (AAPL, TSLA, etc)");
      return;
    }

    try {
      setLoading(true);
      setOutput("⏳ Running...")

      const res = await fn();
      console.log("API RESPONSE:", res.data);

      setOutput(JSON.stringify(res.data, null, 2)); // 👈 REAL OUTPUT

    } catch (err) {
      console.error(err);
      setOutput("❌ ERROR: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const btnStyle = {
    padding: "8px 12px",
    margin: "5px",
    borderRadius: "6px",
    border: "none",
    background: "#222",
    color: "fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div>
      <input
        style={{ padding: "6px", marginRight: "5px" }}
        placeholder="Symbol (AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <input
        style={{ padding: "6px", width: "60px" }}
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <div>
        <button style={btnStyle}
          onMouseEnter={(e) => e.target.style.background = "#444"}
          onMouseLeave={(e) => e.target.style.background = "#222"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          onClick={() => handle(() => getPrice(symbol))}>
          Get Price
        </button>

        <button style={btnStyle}
          onMouseEnter={(e) => e.target.style.background = "#444"}
          onMouseLeave={(e) => e.target.style.background = "#222"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          onClick={() => handle(() => runStrategy(symbol))}>
          Run Strategy
        </button>

        <button style={btnStyle}
          onMouseEnter={(e) => e.target.style.background = "#444"}
          onMouseLeave={(e) => e.target.style.background = "#222"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          onClick={() => handle(() => executeTrade(symbol, quantity))}>
          Execute Trade
        </button>

        <button style={btnStyle}
          onMouseEnter={(e) => e.target.style.background = "#444"}
          onMouseLeave={(e) => e.target.style.background = "#222"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          onClick={() => handle(() => runBot(symbol, quantity))}>
          Run Bot
        </button>

        <button style={btnStyle}
          onMouseEnter={(e) => e.target.style.background = "#444"}
          onMouseLeave={(e) => e.target.style.background = "#222"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
          onClick={() => handle(() => getTrades())}>
          Get Trades
        </button>
      </div>
    </div>
  )
}
export default Controls;