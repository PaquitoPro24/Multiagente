// Búsqueda BFS simple en grid (puedes mejorar a A* después si quieres)

export function findPath(grid, start, goal) {
  const height = grid.length;
  const width = grid[0].length;
  const OBSTACLE = "#";

  const inside = (x, y) =>
    x >= 0 && x < width && y >= 0 && y < height;

  const queue = [];
  const cameFrom = {};
  const key = (x, y) => `${x},${y}`;

  queue.push(start);
  cameFrom[key(start.x, start.y)] = null;

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.x === goal.x && current.y === goal.y) break;

    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ];

    for (const d of dirs) {
      const nx = current.x + d.x;
      const ny = current.y + d.y;
      if (!inside(nx, ny)) continue;
      if (grid[ny][nx] === OBSTACLE) continue;

      const k = key(nx, ny);
      if (cameFrom[k] !== undefined) continue;

      cameFrom[k] = current;
      queue.push({ x: nx, y: ny });
    }
  }

  const goalKey = key(goal.x, goal.y);
  if (cameFrom[goalKey] === undefined) return [];

  // reconstruir ruta
  let path = [];
  let cur = goal;
  while (cur) {
    path.push(cur);
    cur = cameFrom[key(cur.x, cur.y)];
  }
  path.reverse();
  return path;
}
