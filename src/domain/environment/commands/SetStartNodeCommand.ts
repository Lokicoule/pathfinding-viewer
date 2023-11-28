import { Node } from "@/domain/environment/entities";
import { BaseCommand } from "@/infrastructure/mediator";

export class SetStartNodeCommand extends BaseCommand {
  public static readonly commandName = "command:set-start-node";

  constructor(
    public readonly startNode: Node,
    public readonly targetNode: Node
  ) {
    super();
  }
}
