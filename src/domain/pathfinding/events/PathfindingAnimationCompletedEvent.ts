import { Event } from "../../interfaces/Event";

export class PathfindingAnimationCompletedEvent extends Event {
  constructor() {
    super("PathfindingAnimationCompletedEvent");
  }
}
