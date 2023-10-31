import { Node } from "../entities/Node";
import { Event } from "../interfaces/Event";

export class BreadthFirstSearchCompletedEvent extends Event {
  constructor(public readonly endNode: Node) {
    super("BreadthFirstSearchCompletedEvent");
  }
}
