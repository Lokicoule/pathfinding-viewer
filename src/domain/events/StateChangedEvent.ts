import { Event } from "../interfaces/Event";

export class StateChangedEvent extends Event {
  constructor(public readonly state: Record<string, unknown>) {
    super("stateChanged");
  }
}
