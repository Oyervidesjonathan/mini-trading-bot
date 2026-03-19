
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
    <div>
      <button onClick={() => setOutput("")}>
        Clear Output
      </button>

      <pre
        ref={ref}
        style={{
          background: "#111",
          color: getColor(),
          padding: "15px",
          borderRadius: "10px",
          minHeight: "200px",
          maxHeight: "300px",
          overflow: "auto",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)"
        }}

      >
        {output}
      </pre>
    </div>

  );
}

export default Output;