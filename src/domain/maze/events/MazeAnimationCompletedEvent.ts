import { EventBase } from "@/infrastructure/mediator";

export class MazeAnimationCompletedEvent extends EventBase {
  public static readonly type = "MazeAnimationCompletedEvent";

  constructor() {
    super(MazeAnimationCompletedEvent.type);
  }
}
