import { Event } from "../interfaces/Event";

export class EndNodeSetEvent implements Event {
  public readonly type = EndNodeSetEvent.name;
}
