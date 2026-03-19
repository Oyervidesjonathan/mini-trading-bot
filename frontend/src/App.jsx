import { useState } from "react";
import Controls from "./components/Controls";
import Output from "./components/Output";

function App() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div style={{
      padding: "40px",
      maxWidth: "700px",
      margin: "auto",
      fontFamily: "monospace",
      color: "#fff"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: "30px"
      }}>
        🚀 Mini Trading Bot

      </h1>

      <Controls setOutput={setOutput} setLoading={setLoading} />

      <h3 style={{ marginTop: "30px" }}>Output</h3>
      <Output output={output} loading={loading} setOutput={setOutput} />
    </div>
  );
}

export default App;