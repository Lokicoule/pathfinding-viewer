import { Node } from "@/domain/environment/entities";
import { Command } from "@domain/interfaces/Command";

export class SwapStartAndEndNodesCommand extends Command {
  public static readonly type = "SwapStartAndEndNodesCommand";

  constructor(public readonly startNode: Node, public readonly endNode: Node) {
    super(SwapStartAndEndNodesCommand.type);
  }
}
