import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class SetLastInteractedNodeCommand extends Command {
  constructor(public readonly node: Node) {
    super("SetLastInteractedNodeCommand");
  }
}
