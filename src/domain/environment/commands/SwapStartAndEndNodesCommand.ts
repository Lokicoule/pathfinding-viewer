import { Node } from "@domain/environment";
import { BaseCommand } from "@infra/cqrs";

export class SwapStartAndEndNodesCommand extends BaseCommand {
  public static readonly commandName = "command:swap-start-and-end-nodes";

  constructor(public readonly startNode: Node, public readonly endNode: Node) {
    super();
  }
}
