import { Node } from "../entities/Node";
import { Event } from "../interfaces/Event";

export class AlgorithmRunnerCompletedEvent extends Event {
  constructor(
    public readonly endNode: Node,
    public readonly visitedNodesInOrder: Node[]
  ) {
    super("AlgorithmRunnerCompleted");
  }
}
