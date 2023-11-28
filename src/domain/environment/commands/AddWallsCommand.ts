import { Node } from "@domain/environment";
import { BaseCommand } from "@infra/mediator";

export class AddWallsCommand extends BaseCommand {
  public static readonly commandName = "command:add-walls";

  constructor(public readonly nodes: Node[]) {
    super();
  }
}
