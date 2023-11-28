import { BaseEvent } from "@infra/cqrs";

export class PathfindingAnimationCompletedEvent extends BaseEvent {
  public static readonly eventName = "event:pathfinding-animation-completed";
}
