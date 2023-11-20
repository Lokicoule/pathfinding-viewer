import { Event } from "./Event";

export abstract class Command extends Event {
  constructor(type: string) {
    super(type);
  }
}
