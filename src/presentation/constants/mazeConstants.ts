import { AlgorithmViewModel } from "../viewModels/AlgorithmViewModel";

export const MAZE_ALGORITHMS: AlgorithmViewModel[] = [
  {
    name: "Recursive Backtracking",
    type: "MAZE_DFS",
    description:
      "Recursive Backtracking is a maze generation algorithm that uses a randomized depth-first search approach.",
    source:
      "https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search",
  },
  {
    name: "Recursive Division",
    type: "MAZE_RECURSIVE_DIVISION",
    description:
      "Recursive Division is a maze generation algorithm that divides the maze into rooms and chambers by recursively splitting it into two sections.",
    source:
      "https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method",
  },
  {
    name: "Prim's Algorithm",
    type: "MAZE_PRIMS",
    description:
      "Prim's Algorithm is a maze generation algorithm that creates a maze using a deterministic minimum spanning tree approach. It starts with a single cell as the initial tree and systematically adds passages to connect neighboring cells.",
    default: true,
    source:
      "https://weblog.jamisbuck.org/2011/1/10/maze-generation-prim-s-algorithm.html",
  },
];
