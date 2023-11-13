import { MazeAlgorithmType } from "../../domain/types/MazeAlgorithmType";

export const MAZE_ALGORITHMS = new Map<MazeAlgorithmType, string>([
  ["MAZE_RECURSIVE_DIVISION", "Recursive Division"],
  ["MAZE_PRIMS", "Prim's Algorithm"],
  ["MAZE_DFS", "Depth-First Search"],
]);
