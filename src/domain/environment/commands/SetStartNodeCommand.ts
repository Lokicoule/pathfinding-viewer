import { Node } from "@/domain/environment/entities";
import { Command } from "@domain/interfaces/Command";

export class SetStartNodeCommand extends Command {
  public static readonly type = "SetStartNodeCommand";

  constructor(
    public readonly startNode: Node,
    public readonly targetNode: Node
  ) {
    super(SetStartNodeCommand.type);
  }
}
