import { useEffect, useRef } from "react";

/**
 * Output Component
 * ----------------
 * Displays real-time system output (logs, status messages, errors)
 * from the trading bot. Includes auto-scroll behavior and dynamic 
 * color-coding based on message content.
 * 
 * Props:
 * - output (string): Current output/log  text to display
 * - setOutput (function): State setter used to clear output
 */

function Output({ output, setOutput }) {
  const ref = useRef();

  /**
   * Auto-scroll effect
   * ------------------
   * Ensures the ouput box always scrolls to the latest message
   * wheneve new ouput is recived.
   */

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [output]);

  /**
   * Determines text color based on output content
   * ---------------------------------------------
   * - Red: Error messages
   * - Orange: Running / processing state
   * - Green: Normal / success output
   */

  const getColor = () => {
    if (output.includes("ERROR")) return "#ff4444";
    if (output.includes("Running")) return "#ffaa00";
    return "#00ff88";
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>

      {/* Action: Clears all output logs from the UI */}
      <button className="btn" onClick={() => setOutput("")}>
        Clear Output
      </button>

      {/*
       * Output Display
       * --------------
       * - Uses <pre> to preserve formatting (JSON/LOG structure)
       * - Auto-scrolls to latest entry
       * - Dynamically styled based on system state
       */}
      <pre
        ref={ref}
        className="output-box"
        style={{ color: getColor(), marginTop: "15px" }}
      >
        {output}
      </pre>
    </div>
  );
}

export default Output;