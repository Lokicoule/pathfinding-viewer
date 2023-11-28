import { Node } from "@/domain/environment/entities";
import { BaseCommand } from "@infra/cqrs/command/models";

export class RemoveWallsCommand extends BaseCommand {
  public static readonly commandName = "command:remove-walls";

  constructor(public readonly nodes: Node[]) {
    super();
  }
}
