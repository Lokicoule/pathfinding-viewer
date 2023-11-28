import { BaseCommand } from "@infra/cqrs/command/models";
import { Node } from "@domain/environment";

export class AddWallsCommand extends BaseCommand {
  public static readonly commandName = "command:add-walls";

  constructor(public readonly nodes: Node[]) {
    super();
  }
}
