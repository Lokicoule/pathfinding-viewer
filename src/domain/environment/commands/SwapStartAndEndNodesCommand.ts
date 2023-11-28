import { Node } from "@/domain/environment/entities";
import { BaseCommand } from "@infra/cqrs/command/models";

export class SwapStartAndEndNodesCommand extends BaseCommand {
  public static readonly commandName = "command:swap-start-and-end-nodes";

  constructor(public readonly startNode: Node, public readonly endNode: Node) {
    super();
  }
}
