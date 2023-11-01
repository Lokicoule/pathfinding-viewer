import { Node } from "../entities/Node";
import { Event } from "../interfaces/Event";

export class MazeAlgorithmRunnerCompletedEvent extends Event {
  constructor(public readonly wallsInOrder: Node[]) {
    super("MazeAlgorithmRunnerCompletedEvent");
  }
}
