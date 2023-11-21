import { Node } from "../../environment/entities/Node";
import { Event } from "../../interfaces/Event";

export class MazeRunnerCompletedEvent extends Event {
  constructor(public readonly path: Node[]) {
    super("MazeRunnerCompletedEvent");
  }
}
