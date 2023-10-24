import { Event } from "../interfaces/Event";

export class EndNodeSetEvent extends Event {
  constructor() {
    super("EndNodeSetEvent");
  }
}
