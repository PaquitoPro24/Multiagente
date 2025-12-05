import "../styles/hud.css";

export default function HUD({ victims, drones }) {
  return (
    <div className="hud">
      <h2>MISSION STATUS</h2>
      <p>Victims Remaining: {victims.length}</p>
      <p>Active Drones: {drones.length}</p>
      <p>UAV Link: STABLE</p>
    </div>
  );
}
