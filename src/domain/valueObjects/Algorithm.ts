import { AlgorithmType } from "../types/AlgorithmType";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class Algorithm {
  private constructor(public readonly value: AlgorithmType) {}

  public static create(
    value: AlgorithmType = "MAZE_RECURSIVE_DIVISION"
  ): Algorithm {
    return new Algorithm(value);
  }

  public isMazeAlgorithm(): boolean {
    return (
      this.value === "MAZE_DFS" ||
      this.value === "MAZE_PRIMS" ||
      this.value === "MAZE_RECURSIVE_DIVISION"
    );
  }

  public isPathfindingAlgorithm(): boolean {
    return (
      this.value === "PATHFINDING_A_STAR" ||
      this.value === "PATHFINDING_BFS" ||
      this.value === "PATHFINDING_DFS" ||
      this.value === "PATHFINDING_DIJKSTRA"
    );
  }

  public getMazeAlgorithm(): MazeAlgorithmType {
    if (this.isMazeAlgorithm()) {
      return this.value as MazeAlgorithmType;
    }
    throw new Error("Algorithm is not a maze algorithm");
  }

  public getPathfindingAlgorithm(): PathfindingAlgorithmType {
    if (this.isPathfindingAlgorithm()) {
      return this.value as PathfindingAlgorithmType;
    }
    throw new Error("Algorithm is not a pathfinding algorithm");
  }
}
