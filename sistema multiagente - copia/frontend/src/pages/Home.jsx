import React, { useEffect, useState } from "react";
import MapGrid from "../components/MapGrid";
import Radar from "../components/Radar";
import HUD from "../components/HUD";
import MissionLog from "../components/MissionLog";
import ControlPanel from "../components/ControlPanel";
import { createSimulation } from "../logic/simulation";

export default function Home() {
  const [sim, setSim] = useState(null);
  const [state, setState] = useState(null);
  const [log, setLog] = useState([]);

  useEffect(() => {
    const s = createSimulation();
    setSim(s);
    setState({ grid: s.grid, drones: s.drones, victims: s.victims });

    const interval = setInterval(() => {
      const next = s.step();
      setState({ ...next });
      setLog(l => [`Drones moving...`, ...l.slice(0, 30)]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (!state) return <p style={{ color: "#7CFF9A" }}>Loading tactical interface...</p>;

  return (
    <div className="tactical-screen">
      <h1 className="tactical-title">🛰 TACTICAL UAV RESCUE SYSTEM</h1>
      <p className="tactical-subtitle">
        Real-time multi-agent drone coordination over disaster zone.
      </p>

      <div className="tactical-layout">
        <div className="left-panel">
          <Radar />
          <HUD victims={state.victims} drones={state.drones} />
        </div>

        <div className="center-panel">
          <MapGrid grid={state.grid} drones={state.drones} />
        </div>

        <div className="right-panel">
          <MissionLog log={log} />
          <ControlPanel
            reset={() => window.location.reload()}
            toggleVision={() => alert("Night Vision Mode (demo)")}
          />
        </div>
      </div>
    </div>
  );
}
