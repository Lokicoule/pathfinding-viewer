import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class NodeInteractionCommand extends Command {
  constructor(public readonly node: Node) {
    super("NodeInteractionCommand");
  }
}
