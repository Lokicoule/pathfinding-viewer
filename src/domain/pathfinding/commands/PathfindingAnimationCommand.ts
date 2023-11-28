import { BaseCommand } from "@/infrastructure/mediator";
import { Node } from "@domain/environment";

export class PathfindingAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:pathfinding-animation";

  constructor(public readonly endNode: Node, public readonly path: Node[]) {
    super();
  }
}
