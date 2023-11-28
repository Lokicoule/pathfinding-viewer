import { Node } from "@domain/environment";
import { BaseCommand } from "@infra/cqrs";

export class SetStartNodeCommand extends BaseCommand {
  public static readonly commandName = "command:set-start-node";

  constructor(
    public readonly startNode: Node,
    public readonly targetNode: Node
  ) {
    super();
  }
}
