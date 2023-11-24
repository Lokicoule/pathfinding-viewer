import { Node } from "@/domain/environment/entities";
import { CommandBaseWithPayload } from "@/infrastructure/mediator";

type RemoveWallsCommandPayload = {
  nodes: Node[];
};
export class RemoveWallsCommand extends CommandBaseWithPayload<RemoveWallsCommandPayload> {
  public static readonly type = "RemoveWallsCommand";

  constructor(nodes: Node[]) {
    super(RemoveWallsCommand.type, { nodes });
  }
}
