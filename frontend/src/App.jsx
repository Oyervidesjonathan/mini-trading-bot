import { useState } from "react";
import Controls from "./components/Controls";
import Output from "./components/Output";
import AccountSummary from "./components/AccountSummary";

/**
 * App Component (Root)
 * --------------------
 * Main container for the Mini Trading Bot frontend.
 * Responsible for:
 * - Managing global UI state (output logs + loading)
 * - Rendering core components (Controls + Output + AccountSummary)
 * - Providing a centralized layout for the application
 */

function App() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{
      padding: "50px 20px",
      maxWidth: "750px",
      margin: "auto",
      fontFamily: "monospace",
      color: "#fff",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "32px",
        textAlign: "center",
        textShadow: "0 0 10px rgba(0,255,150,0.4)"
      }}>
        🚀 Mini Trading Bot
      </h1>

      {/* Controls */}
      <Controls setOutput={setOutput} setLoading={setLoading} />

      {/* Output Logs */}
      <h3 style={{ marginTop: "30px" }}>Output</h3>
      <Output output={output} loading={loading} setOutput={setOutput} />

      {/* Account Summary (Portfolio Section) */}
      <AccountSummary userId={1} />
    </div>
  );
}

export default App;