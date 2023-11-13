import { Node } from "../../domain/entities/Node";
import { NodeHistory } from "../../domain/entities/NodeHistory";
import { MazeAlgorithmType } from "../../domain/types/MazeAlgorithmType";
import { PathfindingAlgorithmType } from "../../domain/types/PathfindingAlgorithmType";
import { NodeMemento } from "../../domain/valueObjects/NodeMemento";
import { Store } from "../store/Store";

export type ExperienceStoreState = {
  nodeHistory: NodeHistory;
  currentMementoIndex: number;
  isAlgorithmRunning: boolean;
  algorithm: MazeAlgorithmType | PathfindingAlgorithmType | undefined;
};

export class ExperienceStore extends Store<ExperienceStoreState> {
  constructor() {
    super({
      nodeHistory: new NodeHistory(),
      currentMementoIndex: -1,
      isAlgorithmRunning: false,
      algorithm: undefined,
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

  public isAlgorithmRunning(): boolean {
    return this.state.isAlgorithmRunning;
  }

  public setAlgorithm(
    algorithm: MazeAlgorithmType | PathfindingAlgorithmType | undefined
  ) {
    this.state.algorithm = algorithm;
    this.setState(this.state);
  }

  public getAlgorithm():
    | MazeAlgorithmType
    | PathfindingAlgorithmType
    | undefined {
    return this.state.algorithm;
  }

  public reset() {
    this.state.nodeHistory = new NodeHistory();
    this.state.currentMementoIndex = -1;
    this.stopAlgorithm();
    this.setAlgorithm(undefined);
  }
}
