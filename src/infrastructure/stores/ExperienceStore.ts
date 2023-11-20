import { Node } from "@domain/entities/Node";
import { NodeHistory } from "@domain/entities/NodeHistory";
import { MazeAlgorithmType } from "@domain/types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "@domain/types/PathfindingAlgorithmType";
import { Algorithm } from "@domain/valueObjects/Algorithm";
import { NodeMemento } from "@domain/valueObjects/NodeMemento";
import { Speed } from "@domain/valueObjects/Speed";
import { Store } from "../store/Store";

export type ExperienceStoreState = {
  nodeHistory: NodeHistory;
  currentMementoIndex: number;
  algorithm: Algorithm;
  isAlgorithmRunning: boolean;
  speed: Speed;
};

export class ExperienceStore extends Store<ExperienceStoreState> {
  constructor() {
    super({
      nodeHistory: new NodeHistory(),
      currentMementoIndex: -1,
      algorithm: Algorithm.create(),
      isAlgorithmRunning: false,
      speed: Speed.create(Speed.FAST),
    });
  }

  public getLastInteractedNode(): Node | undefined {
    const lastMemento = this.state.nodeHistory.getMemento(
      this.state.currentMementoIndex
    );
    return lastMemento ? lastMemento.getNode() : undefined;
  }

  public getPreviousLastInteractedNode(): Node | undefined {
    const previousMemento = this.state.nodeHistory.getMemento(
      this.state.currentMementoIndex - 1
    );
    return previousMemento ? previousMemento.getNode() : undefined;
  }

  public setLastInteractedNode(node: Node) {
    const memento = NodeMemento.fromNode(node);

    this.state.nodeHistory.addMemento(memento);

    this.state.currentMementoIndex = this.state.nodeHistory.length - 1;
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

  public reset() {
    this.state.nodeHistory = new NodeHistory();
    this.state.currentMementoIndex = -1;
  }

  public setSpeed(speed: Speed) {
    this.state.speed = speed;
    this.setState(this.state);
  }

  public getSpeed(): Speed {
    return this.state.speed;
  }
}
