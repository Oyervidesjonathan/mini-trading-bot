import { useEffect, useState } from "react";
import { getAccount } from "../api/client";

function AccountSummary() {
  const [account, setAccount] = useState(null);

  const userId = 7;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccount(userId);
        console.log("ACCOUNT RESPONSE:", res.data);
        setAccount(res.data);
      } catch (err) {
        console.error("ACCOUNT ERROR:", err);
      }
    };

    fetchAccount();
  }, []);

  if (!account) return <p>Loading account...</p>;

  const positions = account.positions || [];

  return (
    <div style={container}>
      <h2 style={title}>📊 Account Summary</h2>

      {/* TOP CARDS */}
      <div style={grid}>
        <div style={card}>
          <p style={label}>Balance</p>
          <p style={value}>${account.balance}</p>
        </div>

        <div style={card}>
          <p style={label}>Equity</p>
          <p style={value}>${account.equity ?? account.balance}</p>
        </div>

        <div style={card}>
          <p style={label}>Total P/L</p>
          <p
            style={{
              ...value,
              color: (account.pnl ?? 0) >= 0 ? "#00ff88" : "#ff4444",
            }}
          >
            ${account.pnl ?? 0}
          </p>
        </div>
      </div>

      {/* POSITIONS */}
      <div style={section}>
        <h3>Positions</h3>

        {positions.length === 0 ? (
          <p style={{ color: "#888" }}>None</p>
        ) : (
          <table style={table}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Avg</th>
                <th>Price</th>
                <th>Value</th>
                <th>P/L</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p, i) => {
                const symbol = p.symbol ?? p[0];
                const qty = p.qty ?? p[1];
                const avg = p.avg ?? "-";
                const price = p.price ?? 0;
                const value = p.market_value ?? 0;
                const pnl = p.pnl ?? 0;

                return (
                  <tr key={i}>
                    <td>{symbol}</td>
                    <td>{qty}</td>
                    <td>${avg}</td>
                    <td>${price}</td>
                    <td>${value}</td>
                    <td
                      style={{
                        color: pnl >= 0 ? "#00ff88" : "#ff4444",
                      }}
                    >
                      ${pnl}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* LAST TRADE */}
      <div style={section}>
        <h3>Last Trade</h3>

        {account.last_trade ? (
          <div style={card}>
            <p>
              {account.last_trade.symbol ?? account.last_trade[0]} @ $
              {account.last_trade.price ?? account.last_trade[1]}
            </p>
          </div>
        ) : (
          <p style={{ color: "#888" }}>None</p>
        )}
      </div>
    </div>
  );
}

export default AccountSummary;

/* 🎨 STYLES */

const container = {
  maxWidth: "900px",
  margin: "40px auto",
  padding: "20px",
  color: "white",
};

const title = {
  marginBottom: "20px",
  color: "#00ff88",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "15px",
  marginBottom: "25px",
};

const card = {
  background: "#111",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,255,150,0.2)",
};

const label = {
  fontSize: "12px",
  color: "#888",
};

const value = {
  fontSize: "20px",
  fontWeight: "bold",
};

const section = {
  marginTop: "30px",
};

const table = {
  width: "100%",
  marginTop: "10px",
  borderCollapse: "collapse",
};