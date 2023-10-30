import { Event } from "../interfaces/Event";

export class StartAndEndNodesSwappedEvent extends Event {
  constructor() {
    super("StartAndEndNodesSwappedEvent");
  }
}
