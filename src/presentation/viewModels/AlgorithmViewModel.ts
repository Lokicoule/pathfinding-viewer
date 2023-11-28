import { MazeAlgorithmType } from "@domain/maze";
import { PathfindingAlgorithmType } from "@domain/pathfinding";

export type AlgorithmViewModel = {
  name: string;
  type: MazeAlgorithmType | PathfindingAlgorithmType;
  description: string;
  source: string;
  default?: boolean;
};
