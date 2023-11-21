import { Node } from "@/domain/environment/entities";
import { Command } from "@domain/interfaces/Command";

export class SwapStartAndEndNodesCommand extends Command {
  constructor(public readonly startNode: Node, public readonly endNode: Node) {
    super("SwapStartAndEndNodesCommand");
  }
}
