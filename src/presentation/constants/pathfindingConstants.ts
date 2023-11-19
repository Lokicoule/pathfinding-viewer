import { AlgorithmViewModel } from "../viewModels/AlgorithmViewModel";

export const PATHFINDING_ALGORITHMS = [
  {
    name: "A*",
    type: "PATHFINDING_A_STAR",
    description:
      "A* is a pathfinding algorithm that uses a heuristic function to estimate the cost of the cheapest path from a start node to a goal node.",
  },
  {
    name: "Breadth-First Search",
    type: "PATHFINDING_BFS",
    description:
      "Breadth-First Search is a pathfinding algorithm that uses a queue to explore all nodes in a graph. It is guaranteed to find the shortest path between a start node and a goal node.",
  },
  {
    name: "Depth-First Search",
    type: "PATHFINDING_DFS",
    description:
      "Depth-First Search is a pathfinding algorithm that uses a stack to explore all nodes in a graph. It is not guaranteed to find the shortest path between a start node and a goal node.",
  },
  {
    name: "Dijkstra",
    type: "PATHFINDING_DIJKSTRA",
    description:
      "Dijkstra is a pathfinding algorithm that uses a priority queue to explore all nodes in a graph. It is guaranteed to find the shortest path between a start node and a goal node.",
    default: true,
  },
] satisfies AlgorithmViewModel[];
