import { useEffect, useState } from "react";
import { getAccount } from "../api/client";

function AccountSummary() {
  const [account, setAccount] = useState(null);

  // 🔥 CHANGE THIS TO MATCH YOUR REAL USER ID
  const userId = 7;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await getAccount(userId);
        console.log("ACCOUNT RESPONSE:", res.data); // 👈 DEBUG
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
    <div className="account-summary">
      <h3>Account Summary</h3>

      <p>Balance: ${account.balance}</p>

      <div>
        <strong>Positions:</strong>
        {positions.length === 0 ? (
          <p>None</p>
        ) : (
          positions.map((p, i) => (
            <p key={i}>{p[0]}: {p[1]} shares</p>
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