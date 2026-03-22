import { useState } from "react";
import Controls from "./components/Controls";
import Output from "./components/Output";

/**
 * App Component (Root)
 * --------------------
 * Main container for the Mini Trading Bot frontend.
 * Responsible for:
 * - Managing global UI state (output logs + Output)
 * - Rendering core components (Controls + Output)
 * - Providing a centralized layout for the application
 */

function App() {
  // stores system ouput/log messages (API responses, trade status, etc.)
  const [output, setOutput] = useState("");
  // Tracks whether a pricess (e.g, scan or trade execution) is running
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
      {/*
        Controls component
        ------------------
        Handels user actions such as:
        - Running scans
        - Executing simulated trades
        - Triggering backend API calls

        Recives state setters to update output and loading status.
       */}

      <Controls setOutput={setOutput} setLoading={setLoading} />

      <h3 style={{ marginTop: "30px" }}>Output</h3>
      {/*
        Output Component
        ----------------
        Displays system logs and results from user actions.
        Recives:
        - output: current log text
        - loading: current processing state
        - setOutput: allows clearing/resetting output
      */}
      <Output output={output} loading={loading} setOutput={setOutput} />
    </div>
  );
}

export default App;