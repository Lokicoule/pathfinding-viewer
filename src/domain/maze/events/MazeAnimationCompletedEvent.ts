import { Event } from "../../interfaces/Event";

export class MazeAnimationCompletedEvent extends Event {
  public static readonly type = "MazeAnimationCompletedEvent";

  constructor() {
    super(MazeAnimationCompletedEvent.type);
  }
}
