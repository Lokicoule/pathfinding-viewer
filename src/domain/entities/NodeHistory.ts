import { NodeMemento } from "../valueObjects/NodeMemento";

export class NodeHistory {
  private mementos: NodeMemento[] = [];

  addMemento(memento: NodeMemento) {
    this.mementos.push(memento);
  }

  getMemento(index: number): NodeMemento | undefined {
    return this.mementos[index];
  }

  get length(): number {
    return this.mementos.length;
  }
}
