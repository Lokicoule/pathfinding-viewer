import { Event } from "../interfaces/Event";

export class WallAddedEvent extends Event {
  constructor() {
    super("WallAddedEvent");
  }
}
