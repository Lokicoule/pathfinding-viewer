import { Event } from "../../interfaces/Event";

export class PathfindingAnimationCompletedEvent extends Event {
  public static readonly type = "PathfindingAnimationCompletedEvent";

  constructor() {
    super(PathfindingAnimationCompletedEvent.type);
  }
}
