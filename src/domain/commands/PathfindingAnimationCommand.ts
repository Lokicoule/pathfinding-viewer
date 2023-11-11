import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class PathfindingAnimationCommand extends Command {
  constructor(public readonly endNode: Node, public readonly path: Node[]) {
    super("PathfindingAnimationCommand");
  }
}
