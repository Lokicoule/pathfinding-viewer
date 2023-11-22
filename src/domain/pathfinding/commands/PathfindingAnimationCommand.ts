import { Node } from "@domain/environment";
import { Command } from "../../interfaces/Command";

export class PathfindingAnimationCommand extends Command {
  public static readonly type = "PathfindingAnimationCommand";

  constructor(public readonly endNode: Node, public readonly path: Node[]) {
    super(PathfindingAnimationCommand.type);
  }
}
