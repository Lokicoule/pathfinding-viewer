import { Event } from "../interfaces/Event";

export class WallRemovedEvent implements Event {
  public readonly type = WallRemovedEvent.name;
}
