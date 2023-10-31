import { Node } from "../entities/Node";
import { Event } from "../interfaces/Event";

export class DepthFirstSearchCompletedEvent extends Event {
  constructor(public readonly endNode: Node) {
    super("DepthFirstSearchCompletedEvent");
  }
}
