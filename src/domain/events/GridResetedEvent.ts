import { Event } from "../interfaces/Event";

export class GridResetEvent extends Event {
  constructor() {
    super("GridResetEvent");
  }
}
