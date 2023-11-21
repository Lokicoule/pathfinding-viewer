import { Node } from "@/domain/environment/entities";
import { Command } from "@domain/interfaces/Command";

export class SetEndNodeCommand extends Command {
  constructor(public readonly endNode: Node, public readonly targetNode: Node) {
    super("SetEndNodeCommand");
  }
}
