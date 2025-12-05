import "../styles/radar.css";

export default function Radar() {
  return (
    <div>
      <div className="radar">
        <div className="radar-grid"></div>
        <div className="radar-sweep"></div>
      </div>
      <p style={{ fontSize: "12px", textAlign: "center", marginTop: "4px" }}>
        RADAR ONLINE
      </p>
    </div>
  );
}
