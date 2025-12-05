export default function MissionLog({ log }) {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #1B2A24",
        borderRadius: "8px",
        padding: "8px",
        background: "#040806",
        overflowY: "auto",
        fontSize: "12px"
      }}
    >
      <h3 style={{ marginBottom: "6px" }}>MISSION LOG</h3>
      {log.map((entry, i) => (
        <p key={i}>▶ {entry}</p>
      ))}
    </div>
  );
}
