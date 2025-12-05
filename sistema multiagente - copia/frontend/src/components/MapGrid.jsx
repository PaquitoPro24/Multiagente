import "../styles/map.css";

export default function MapGrid({ grid, drones }) {
  const isDroneHere = (x, y) =>
    drones.some(d => d.x === x && d.y === y);

  return (
    <div className="map-container">
      {grid.map((row, y) =>
        <div key={y} className="row">
          {row.map((cell, x) => {
            let cls = "cell";

            if (cell === "#") cls += " obstacle";
            if (cell === "V") cls += " victim";
            if (cell === "B") cls += " base";
            if (isDroneHere(x, y)) cls += " drone";

            return <div key={x} className={cls}></div>;
          })}
        </div>
      )}
    </div>
  );
}
