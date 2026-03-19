import { useState } from "react";
import Controls from "./components/Controls";
import Output from "./components/Output";

function App() {
  const [output, setOutput] = useState("");

  return (
    <div style={{
      padding: "30px",
      maxWidth: "600px",
      margin: "auto",
      fontFamily: "monospace"
    }}>
      <h1>🚀 Mini Trading Bot</h1>

      <Controls setOutput={output} />

      <h3>Output</h3>
      <Output output={output} />
    </div>
  )
}

export default App;