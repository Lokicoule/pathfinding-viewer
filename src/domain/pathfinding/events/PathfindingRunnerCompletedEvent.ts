import { EventBaseWithPayload } from "@/infrastructure/mediator";
import { Node } from "../../environment/entities/Node";

type PathfindingRunnerCompletedEventPayload = {
  endNode: Node;
  path: Node[];
};
export class PathfindingRunnerCompletedEvent extends EventBaseWithPayload<PathfindingRunnerCompletedEventPayload> {
  public static readonly type = "PathfindingRunnerCompletedEvent";

  constructor(endNode: Node, path: Node[]) {
    super(PathfindingRunnerCompletedEvent.type, { endNode, path });
  }
}
