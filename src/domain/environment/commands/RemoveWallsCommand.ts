import { Node } from "@domain/environment";
import { BaseCommand } from "@infra/cqrs";

export class RemoveWallsCommand extends BaseCommand {
  public static readonly commandName = "command:remove-walls";

  constructor(public readonly nodes: Node[]) {
    super();
  }
}
