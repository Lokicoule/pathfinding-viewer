import { MazeAlgorithmType } from "@domain/types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "@domain/types/PathfindingAlgorithmType";
import { Algorithm } from "@domain/valueObjects/Algorithm";
import { Store } from "../store/Store";

export type AlgorithmStoreState = {
  algorithm: Algorithm;
  isAlgorithmRunning: boolean;
};

export class AlgorithmStore extends Store<AlgorithmStoreState> {
  constructor() {
    super({
      algorithm: Algorithm.create(),
      isAlgorithmRunning: false,
    });
  }

  public startAlgorithm() {
    this.state.isAlgorithmRunning = true;
    this.setState(this.state);
  }

  public stopAlgorithm() {
    this.state.isAlgorithmRunning = false;
    this.setState(this.state);
  }

  public setAlgorithm(algorithm: MazeAlgorithmType | PathfindingAlgorithmType) {
    this.state.algorithm = Algorithm.create(algorithm);
    this.setState(this.state);
  }

  public getAlgorithm() {
    return this.state.algorithm;
  }

  public isAlgorithmRunning(): boolean {
    return this.state.isAlgorithmRunning;
  }
}
