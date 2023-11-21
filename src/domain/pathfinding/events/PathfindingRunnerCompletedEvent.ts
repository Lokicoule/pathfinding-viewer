import { Node } from "../../environment/entities/Node";
import { Event } from "../../interfaces/Event";

export class PathfindingRunnerCompletedEvent extends Event {
  constructor(public readonly endNode: Node, public readonly path: Node[]) {
    super("PathfindingRunnerCompletedEvent");
  }
}
