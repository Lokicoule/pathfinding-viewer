import { Node } from "@/domain/environment/entities";
import { Command } from "@domain/interfaces/Command";

export class RemoveWallsCommand extends Command {
  public static readonly type = "RemoveWallsCommand";

  constructor(public readonly nodes: Node[]) {
    super(RemoveWallsCommand.type);
  }
}
