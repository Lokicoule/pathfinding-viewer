import { Event } from "../interfaces/Event";

export class StartNodeSetEvent implements Event {
  public readonly type = StartNodeSetEvent.name;
}
