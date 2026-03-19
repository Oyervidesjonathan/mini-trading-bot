import { useState } from "react"
import {
  getPrice,
  runStrategy,
  executeTrade,
  runBot,
  getTrades
} from "../api/client";

function Controls({ setOutput }) {
  const [symbol, setSymbol] = useState("AAPL");
  const [quantity, setQuantity] = useState(1);

  const handle = async (fn) => {
    if (!symbol) {
      setOutput("⚠️ Enter a symbol (AAPL, TSLA, etc)");
      return;
    }

    try {
      const res = await fn();
      console.log("API RESPONSE:", res.data);

      setOutput(JSON.stringify(res.data, null, 2)); // 👈 REAL OUTPUT

    } catch (err) {
      console.error(err);
      setOutput("ERROR: " + err.message);
    }
  };

  return (
    <div>
      <input
        placeholder="Symbol (AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <div>
        <button onClick={() => handle(() => getPrice(symbol))}>
          Get Price
        </button>

        <button onClick={() => handle(() => runStrategy(symbol))}>
          Run Strategy
        </button>

        <button onClick={() => handle(() => executeTrade(symbol, quantity))}>
          Execute Trade
        </button>

        <button onClick={() => handle(() => runBot(symbol, quantity))}>
          Run Bot
        </button>

        <button onClick={() => handle(() => getTrades())}>
          Get Trades
        </button>
      </div>
    </div>
  )
}
export default Controls;