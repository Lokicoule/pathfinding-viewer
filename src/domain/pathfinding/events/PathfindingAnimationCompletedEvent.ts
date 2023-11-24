import { EventBase } from "@/infrastructure/mediator";

export class PathfindingAnimationCompletedEvent extends EventBase {
  public static readonly type = "PathfindingAnimationCompletedEvent";

  constructor() {
    super(PathfindingAnimationCompletedEvent.type);
  }
}
