import { AlgorithmType } from "../types/AlgorithmType";
import { MazeAlgorithmType } from "../../maze/types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "../../pathfinding/types/PathfindingAlgorithmType";

export class Algorithm {
  private constructor(public readonly value: AlgorithmType) {}

  public static create(value: AlgorithmType = "MAZE_PRIMS"): Algorithm {
    return new Algorithm(value);
  }

  public isMazeAlgorithm(): boolean {
    return Algorithm.isMazeAlgorithm(this.value);
  }

  public isPathfindingAlgorithm(): boolean {
    return Algorithm.isPathfindingAlgorithm(this.value);
  }

  public static isMazeAlgorithm(value: AlgorithmType): boolean {
    return (
      value === "MAZE_DFS" ||
      value === "MAZE_PRIMS" ||
      value === "MAZE_RECURSIVE_DIVISION"
    );
  }

  public static isPathfindingAlgorithm(value: AlgorithmType): boolean {
    return (
      value === "PATHFINDING_A_STAR" ||
      value === "PATHFINDING_BFS" ||
      value === "PATHFINDING_DFS" ||
      value === "PATHFINDING_DIJKSTRA"
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
