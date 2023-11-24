import { Node } from "@domain/environment";
import { CommandBaseWithPayload } from "@infra/mediator";

type PathfindingAnimationCommandPayload = {
  endNode: Node;
  path: Node[];
};
export class PathfindingAnimationCommand extends CommandBaseWithPayload<PathfindingAnimationCommandPayload> {
  public static readonly type = "PathfindingAnimationCommand";

  constructor(endNode: Node, path: Node[]) {
    super(PathfindingAnimationCommand.type, { endNode, path });
  }
}
