import { MazeAlgorithmType } from "@domain/types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "@domain/types/PathfindingAlgorithmType";

export type AlgorithmViewModel = {
  name: string;
  type: MazeAlgorithmType | PathfindingAlgorithmType;
  description: string;
  default?: boolean;
};
