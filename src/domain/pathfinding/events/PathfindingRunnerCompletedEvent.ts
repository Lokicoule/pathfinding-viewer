import { BaseEvent } from "@/infrastructure/cqrs/event/models";
import { Node } from "../../environment/entities/Node";

export class PathfindingRunnerCompletedEvent extends BaseEvent {
  public static readonly eventName = "event:pathfinding-runner-completed";

  constructor(public readonly endNode: Node, public readonly path: Node[]) {
    super();
  }
}
