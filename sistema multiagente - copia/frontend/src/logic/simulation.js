// Simulación sencilla: drones se mueven hacia la víctima más cercana (por distancia Manhattan)

export function createSimulation(width = 20, height = 15, numDrones = 3, numVictims = 5) {
  const EMPTY = ".";
  const OBSTACLE = "#";
  const VICTIM = "V";
  const BASE = "B";

  // Grid vacío
  let grid = Array.from({ length: height }, () => Array(width).fill(EMPTY));
  grid[0][0] = BASE;

  // Obstáculos aleatorios
  for (let i = 0; i < 30; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (grid[y][x] === EMPTY) grid[y][x] = OBSTACLE;
  }

  // Víctimas
  let victims = [];
  for (let i = 0; i < numVictims; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    if (grid[y][x] === EMPTY) {
      grid[y][x] = VICTIM;
      victims.push({ x, y });
    }
  }

  // Drones
  let drones = Array.from({ length: numDrones }, (_, i) => ({
    id: i + 1,
    x: 0,
    y: 0,
    target: null
  }));

  function step() {
    drones.forEach((drone) => {
      // Seleccionar víctima más cercana si no tiene objetivo
      if (!drone.target) {
        let closest = null;
        let minDist = Infinity;

        victims.forEach(v => {
          const dist = Math.abs(drone.x - v.x) + Math.abs(drone.y - v.y);
          if (dist < minDist) {
            minDist = dist;
            closest = v;
          }
        });

        drone.target = closest || null;
      }

      if (!drone.target) return; // no hay víctimas

      // Movimiento simple hacia el objetivo
      if (drone.x < drone.target.x) drone.x++;
      else if (drone.x > drone.target.x) drone.x--;

      if (drone.y < drone.target.y) drone.y++;
      else if (drone.y > drone.target.y) drone.y--;

      // Llegó a la víctima
      if (drone.x === drone.target.x && drone.y === drone.target.y) {
        victims = victims.filter(v => !(v.x === drone.x && v.y === drone.y));
        grid[drone.y][drone.x] = EMPTY;
        drone.target = null;
      }
    });

    return { grid, drones, victims };
  }

  return { grid, drones, victims, step };
}
