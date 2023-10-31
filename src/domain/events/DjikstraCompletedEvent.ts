import { Node } from "../entities/Node";
import { Event } from "../interfaces/Event";

export class DjikstraCompletedEvent extends Event {
  constructor(public readonly endNode: Node) {
    super("DjikstraCompletedEvent");
  }
}
