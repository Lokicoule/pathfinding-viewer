import { Event } from "../interfaces/Event";

export class GridUpdatedEvent implements Event {
  public readonly type = GridUpdatedEvent.name;
}
