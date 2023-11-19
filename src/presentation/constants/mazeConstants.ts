import { AlgorithmViewModel } from "../viewModels/AlgorithmViewModel";

export const MAZE_ALGORITHMS = [
  {
    name: "Recursive Backtracking",
    type: "MAZE_DFS",
    description:
      "Recursive Backtracking is a maze generation algorithm that uses a recursive depth-first search to generate a maze. It is a randomized version of the depth-first search algorithm.",
  },
  {
    name: "Recursive Division",
    type: "MAZE_RECURSIVE_DIVISION",
    description:
      "Recursive Division is a maze generation algorithm that uses a recursive depth-first search to generate a maze. It is a randomized version of the depth-first search algorithm.",
  },
  {
    name: "Prim's Algorithm",
    type: "MAZE_PRIMS",
    description:
      "Prim's Algorithm is a maze generation algorithm that uses a randomized minimum spanning tree to generate a maze. It is a randomized version of the depth-first search algorithm.",
    default: true,
  },
] satisfies AlgorithmViewModel[];
