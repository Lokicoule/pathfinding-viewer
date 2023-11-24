import { Node } from "@domain/environment";
import { CommandBaseWithPayload } from "@infra/mediator";

type AddWallsCommandPayload = {
  nodes: Node[];
};

export class AddWallsCommand extends CommandBaseWithPayload<AddWallsCommandPayload> {
  public static readonly type = "AddWallsCommand";

  constructor(nodes: Node[]) {
    super(AddWallsCommand.type, { nodes });
  }
}
