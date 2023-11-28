import { Node } from "@/domain/environment/entities";
import { BaseCommand } from "@/infrastructure/mediator";

export class RemoveWallsCommand extends BaseCommand {
  public static readonly commandName = "command:remove-walls";

  constructor(public readonly nodes: Node[]) {
    super();
  }
}
