import { Node } from "@/domain/environment/entities";
import { Command } from "@domain/interfaces/Command";

export class AddWallsCommand extends Command {
  public static readonly type = "AddWallsCommand";

  constructor(public readonly nodes: Node[]) {
    super(AddWallsCommand.type);
  }
}
