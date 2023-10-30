import { Node } from "../entities/Node";

export class NodeMemento {
  private constructor(private node: Node) {}

  public static fromNode(node: Node): NodeMemento {
    return new NodeMemento(node);
  }

  getNode(): Node {
    return this.node;
  }
}
