import { AlgorithmViewModel } from "../viewModels/AlgorithmViewModel";

export const PATHFINDING_ALGORITHMS: AlgorithmViewModel[] = [
  {
    name: "A*",
    type: "PATHFINDING_A_STAR",
    description:
      "A* is a pathfinding algorithm that estimates the cost of the cheapest path from a start node to an end node using a heuristic function. It guarantees finding the shortest path between a start node and an end node.",
    source: "https://en.wikipedia.org/wiki/A*_search_algorithm",
  },
  {
    name: "Breadth-First Search",
    type: "PATHFINDING_BFS",
    description:
      "Breadth-First Search is a pathfinding algorithm that explores all nodes in a graph using a queue. It guarantees finding the shortest path between a start node and an end node.",
    source: "https://en.wikipedia.org/wiki/Breadth-first_search",
  },
  {
    name: "Depth-First Search",
    type: "PATHFINDING_DFS",
    description:
      "Depth-First Search is a pathfinding algorithm that explores all nodes in a graph using a stack. It may not guarantee the shortest path between a start node and an end node.",
    source: "https://en.wikipedia.org/wiki/Depth-first_search",
  },
  {
    name: "Dijkstra",
    type: "PATHFINDING_DIJKSTRA",
    description:
      "Dijkstra is a pathfinding algorithm that explores all nodes in a graph using a priority queue. It guarantees finding the shortest path between a start node and an end node.",
    source: "https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm",
    default: true,
  },
];
