import { Event } from "../interfaces/Event";

export class MazeAnimationCompletedEvent extends Event {
  constructor() {
    super("MazeAnimationCompletedEvent");
  }
}
