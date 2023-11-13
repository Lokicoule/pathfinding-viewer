import { PathfindingAlgorithmType } from "../../domain/types/PathfindingAlgorithmType";

export const PATHFINDING_ALGORITHMS = new Map<PathfindingAlgorithmType, string>(
  [
    ["PATHFINDING_A_STAR", "A*"],
    ["PATHFINDING_BFS", "Breadth-First Search"],
    ["PATHFINDING_DFS", "Depth-First Search"],
    ["PATHFINDING_DIJKSTRA", "Dijkstra"],
  ]
);
