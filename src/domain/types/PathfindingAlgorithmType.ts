export type PathfindingAlgorithmType = "BFS" | "DFS" | "DIJKSTRA" | "A_STAR";

export const mapStringToPathfindingAlgorithm = (
  type: string
): PathfindingAlgorithmType => {
  switch (type) {
    case "BFS":
    case "DFS":
    case "DIJKSTRA":
    case "A_STAR":
      return type;
    default:
      throw new Error(`${type} is not a valid algorithm`);
  }
};
