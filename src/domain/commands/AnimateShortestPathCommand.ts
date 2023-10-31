import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class AnimateShortestPathCommand extends Command {
  constructor(public readonly endNode: Node) {
    super("AnimateShortestPathCommand");
  }
}
