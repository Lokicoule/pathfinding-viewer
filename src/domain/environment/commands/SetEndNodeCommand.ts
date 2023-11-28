import { Node } from "@domain/environment";
import { BaseCommand } from "@infra/cqrs";

export class SetEndNodeCommand extends BaseCommand {
  public static readonly commandName = "command:set-end-node";

  constructor(public readonly endNode: Node, public readonly targetNode: Node) {
    super();
  }
}
