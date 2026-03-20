import { useEffect, useRef } from "react";

function Output({ output, setOutput }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [output]);

  const getColor = () => {
    if (output.includes("ERROR")) return "#ff4444";
    if (output.includes("Running")) return "#ffaa00";
    return "#00ff88";
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>

      {/* CLEAR BUTTON */}
      <button className="btn" onClick={() => setOutput("")}>
        Clear Output
      </button>

      {/* OUTPUT BOX */}
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