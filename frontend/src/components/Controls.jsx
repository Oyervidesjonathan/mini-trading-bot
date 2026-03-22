/*
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

/*
 * Controls component
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

  const formatLog = (type, data) => {
    const time = new Date().toLocaleTimeString();
    const divider = "---------------------------";

    switch (type) {
      case "price":
        return `[${time}] PRICE FETCHED
${divider}
Symbol: ${data?.symbol || "N/A"}
Price: $${Number(data?.price || 0).toFixed(2)}
Status: SUCCESS\n\n`;

      case "trade":
        return `[${time}] TRADE EXECUTED
${divider}
Symbol: ${data?.symbol || "N/A"}
Qty: ${data?.qty || quantity}
Price: $${Number(data?.price || 0).toFixed(2)}
Status: SUCCESS\n\n`;

      case "strategy":
        return `[${time}] STRATEGY RESULT
${divider}
Symbol: ${data?.symbol || "N/A"}
Signal: ${data?.signal || "N/A"}
Status: COMPLETE\n\n`;

      case "bot":
        return `[${time}] BOT EXECUTION
${divider}
Symbol: ${data?.symbol || "N/A"}
Price: $${Number(data?.price || 0).toFixed(2)}
Decision: ${data?.decision || "N/A"}
Trade Executed: ${data?.trade_executed ? "YES" : "NO"}
${data?.trade ? `Trade ID: ${data.trade.id}` : ""}
Status: COMPLETE\n\n`;

      case "trades":
        return `[${time}] TRADE HISTORY LOADED
${divider}
Total Trades: ${data?.length || 0}
Status: SUCCESS\n\n`;

      case "error":
        return `[${time}] ERROR
${divider}
Message: ${data}\n\n`;

      default:
        return `[${time}] ${JSON.stringify(data, null, 2)}\n\n`;
    }
  };

  const handle = async (fn, type) => {
    const requiresSymbol = ["price", "strategy", "trade", "bot"].includes(type);
    const requiresQuantity = ["trade", "bot"].includes(type);

    if (requiresSymbol && !symbol.trim()) {
      setOutput(prev => prev + formatLog("error", "Enter a valid symbol"));
      return;
    }

    if (requiresQuantity && Number(quantity) <= 0) {
      setOutput(prev => prev + formatLog("error", "Enter a valid quantity"));
      return;
    }

    try {
      setLoading(true);
      document.body.style.cursor = "wait";

      // show running log
      setOutput(prev =>
        prev + `[${new Date().toLocaleTimeString()}] RUNNING...\n\n`
      );

      const res = await fn();

      // 🔥 SAFE DATA EXTRACTION
      const data = res?.data || res || {};

      console.log("API RESPONSE:", data);

      // if backend returned error message
      if (data?.error) {
        setOutput(prev => prev + formatLog("error", data.error));
      } else {
        setOutput(prev => prev + formatLog(type, data));
      }

    } catch (err) {
      console.error("API ERROR:", err);

      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Unknown error";

      setOutput(prev => prev + formatLog("error", message));
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
      <div
        style={{
          marginTop: "15px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        <button
          className="btn"
          onClick={() => handle(() => getPrice(symbol), "price")}
        >
          Get Price
        </button>

        <button
          className="btn"
          onClick={() => handle(() => runStrategy(symbol), "strategy")}
        >
          Run Strategy
        </button>

        <button
          className="btn"
          onClick={() => handle(() => executeTrade(symbol, quantity), "trade")}
        >
          Execute Trade
        </button>

        <button
          className="btn"
          onClick={() => handle(() => runBot(symbol, quantity), "bot")}
        >
          Run Bot
        </button>

        <button
          className="btn"
          onClick={() => handle(() => getTrades(), "trades")}
        >
          Get Trades
        </button>
      </div>
    </div>
  );
}

export default Controls;