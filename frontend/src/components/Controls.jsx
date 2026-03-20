/**
 * Controls component
 * 
 * This component handles all user interactions for the trading app.
 * It collects user input (symbol + quantity) and triggers API calls
 * through the client layer.
 * 
 * Responsibilities:
 * - Manage local UI state (symbol, quantity)
 * - Trigger backend requests
 * - Handle async responses + errors
 * - Send formatted output back to parent component (App.jsx)
 */

import { useState } from "react";
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
      document.body.style.cursor = "wait";
      setOutput("⏳ Running...");

      const res = await fn();
      console.log("API RESPONSE:", res.data);

      setOutput(JSON.stringify(res.data, null, 2));

    } catch (err) {
      console.error(err);
      setOutput("❌ ERROR: " + err.message);
    } finally {
      setLoading(false);
      document.body.style.cursor = "default";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>

      {/* INPUTS */}
      <div style={{ marginBottom: "10px" }}>
        <input
          className="input"
          placeholder="Symbol (AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <input
          className="input"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      {/* BUTTONS */}
      <div style={{
        marginTop: "15px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        <button className="btn" onClick={() => handle(() => getPrice(symbol))}>
          Get Price
        </button>

        <button className="btn" onClick={() => handle(() => runStrategy(symbol))}>
          Run Strategy
        </button>

        <button className="btn" onClick={() => handle(() => executeTrade(symbol, quantity))}>
          Execute Trade
        </button>

        <button className="btn" onClick={() => handle(() => runBot(symbol, quantity))}>
          Run Bot
        </button>

        <button className="btn" onClick={() => handle(() => getTrades())}>
          Get Trades
        </button>
      </div>
    </div>
  );
}

export default Controls;