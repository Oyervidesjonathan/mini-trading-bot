
function Output({ output }) {
  return (
    <pre style={{
      background: "#111",
      color: "#0f0",
      padding: "10px",
      borderRadius: "8px",
      minHeight: "150px",
      overflow: "auto",
    }}>
      {output}
    </pre>
  );
}

export default Output;