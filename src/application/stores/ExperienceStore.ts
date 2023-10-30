import { Node } from "../../domain/entities/Node";
import { NodeHistory } from "../../domain/entities/NodeHistory";
import { NodeMemento } from "../../domain/valueObjects/NodeMemento";
import { Store } from "../../infrastructure/store/Store";

type ExperienceStoreState = {
  nodeHistory: NodeHistory;
  currentMementoIndex: number;
};

export class ExperienceStore extends Store<ExperienceStoreState> {
  constructor() {
    super({
      nodeHistory: new NodeHistory(),
      currentMementoIndex: -1,
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

  public reset() {
    this.state.nodeHistory = new NodeHistory();
    this.state.currentMementoIndex = -1;
  }
}
