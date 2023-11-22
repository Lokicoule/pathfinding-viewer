import { MazeAlgorithmType } from "@/domain/maze/types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "@/domain/pathfinding/types/PathfindingAlgorithmType";

export type AlgorithmViewModel = {
  name: string;
  type: MazeAlgorithmType | PathfindingAlgorithmType;
  description: string;
  source: string;
  default?: boolean;
};
