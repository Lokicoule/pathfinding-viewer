import { AlgorithmType } from "@domain/types/AlgorithmType";

export const ALGORITHMS = new Map<AlgorithmType, string>([
  ["MAZE_RECURSIVE_DIVISION", "Recursive Division (Maze)"],
  ["MAZE_PRIMS", "Prim's Algorithm (Maze)"],
  ["MAZE_DFS", "Depth-First Search (Maze)"],
  ["PATHFINDING_DIJKSTRA", "Dijkstra's Algorithm (Pathfinding)"],
  ["PATHFINDING_A_STAR", "A* Search (Pathfinding)"],
  ["PATHFINDING_BFS", "Breadth-First Search (Pathfinding)"],
  ["PATHFINDING_DFS", "Depth-First Search (Pathfinding)"],
]);
