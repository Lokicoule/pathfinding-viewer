import { Event } from "../interfaces/Event";

export class RenderedEvent implements Event {
  public readonly type = RenderedEvent.name;
}
