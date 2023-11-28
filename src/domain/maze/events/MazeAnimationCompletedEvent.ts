import { BaseEvent } from "@/infrastructure/cqrs/event/models";

export class MazeAnimationCompletedEvent extends BaseEvent {
  public static readonly eventName = "event:maze-animation-completed";
}
