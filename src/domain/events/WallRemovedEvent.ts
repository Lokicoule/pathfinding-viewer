import { Event } from "../interfaces/Event";

export class WallRemovedEvent extends Event {
  constructor() {
    super("WallRemovedEvent");
  }
}
