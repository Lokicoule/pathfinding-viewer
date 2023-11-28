import { BaseEvent } from "@/infrastructure/cqrs/event/models";

export class PathfindingAnimationCompletedEvent extends BaseEvent {
  public static readonly eventName = "event:pathfinding-animation-completed";
}
