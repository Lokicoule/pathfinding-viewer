import { BaseEvent } from "@/infrastructure/cqrs/event/models";
import { Node } from "../../environment/entities/Node";

export class MazeRunnerCompletedEvent extends BaseEvent {
  public static readonly eventName = "event:maze-runner-completed";

  constructor(public readonly path: Node[]) {
    super();
  }
}
