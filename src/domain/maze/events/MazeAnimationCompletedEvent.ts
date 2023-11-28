import { BaseEvent } from "@infra/cqrs";

export class MazeAnimationCompletedEvent extends BaseEvent {
  public static readonly eventName = "event:maze-animation-completed";
}
