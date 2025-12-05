export default function ControlPanel({ reset, toggleVision }) {
  return (
    <div className="control-bar">
      <button onClick={reset}>RESET SIM</button>
      <button onClick={toggleVision}>VISION MODE</button>
    </div>
  );
}
