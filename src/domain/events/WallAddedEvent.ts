import { Event } from "../interfaces/Event";

export class WallAddedEvent implements Event {
  public readonly type = WallAddedEvent.name;
}
