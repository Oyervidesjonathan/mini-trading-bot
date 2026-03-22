import { useEffect, useState } from "react";
import { getAccount } from "../api/client";

/**
 * AccountSummary Component
 * ------------------------
 * Displays portfolio data tied to a specific user.
 */

function AccountSummary({ userId }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccount(userId);
        setAccount(res.data);
      } catch (err) {
        console.error("Account fetch failed:", err);

        // fallback so UI doesn't crash
        setAccount({
          balance: 0,
          positions: [],
          last_trade: null
        });
      }
    };

    fetchAccount();
  }, [userId]);

  // Loading state
  if (!account) {
    return <p style={{ marginTop: "20px" }}>Loading account...</p>;
  }

  // Safe defaults
  const positions = account.positions || [];

  return (
    <div className="account-summary">
      <h3>Account Summary</h3>

      <p>Balance: ${account.balance ?? 0}</p>

      <div>
        <strong>Positions:</strong>
        {positions.length === 0 ? (
          <p>None</p>
        ) : (
          positions.map((p, i) => (
            <p key={i}>
              {p[0]}: {p[1]} shares
            </p>
          ))
        )}
      </div>

      <p>
        <strong>Last Trade:</strong>{" "}
        {account.last_trade
          ? `${account.last_trade[0]} @ $${account.last_trade[1]}`
          : "None"}
      </p>
    </div>
  );
}

export default AccountSummary;