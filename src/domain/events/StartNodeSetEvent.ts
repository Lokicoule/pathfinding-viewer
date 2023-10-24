import { Event } from "../interfaces/Event";

export class StartNodeSetEvent extends Event {
  constructor() {
    super("StartNodeSetEvent");
  }
}
