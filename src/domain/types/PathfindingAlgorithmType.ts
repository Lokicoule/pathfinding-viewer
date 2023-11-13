export type PathfindingAlgorithmType =
  | "PATHFINDING_BFS"
  | "PATHFINDING_DFS"
  | "PATHFINDING_DIJKSTRA"
  | "PATHFINDING_A_STAR";

export const mapStringToPathfindingAlgorithm = (
  type: string
): PathfindingAlgorithmType => {
  switch (type) {
    case "PATHFINDING_BFS":
    case "PATHFINDING_DFS":
    case "PATHFINDING_DIJKSTRA":
    case "PATHFINDING_A_STAR":
      return type;
    default:
      throw new Error(`${type} is not a valid algorithm`);
  }
};
