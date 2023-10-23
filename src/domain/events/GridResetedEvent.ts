import { Event } from "../interfaces/Event";

export class GridResetEvent implements Event {
  public readonly type = GridResetEvent.name;
}
