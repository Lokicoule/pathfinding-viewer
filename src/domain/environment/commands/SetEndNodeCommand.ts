import { Node } from "@/domain/environment/entities";
import { CommandBaseWithPayload } from "@/infrastructure/mediator";

type SetEndNodeCommandPayload = {
  endNode: Node;
  targetNode: Node;
};

export class SetEndNodeCommand extends CommandBaseWithPayload<SetEndNodeCommandPayload> {
  public static readonly type = "SetEndNodeCommand";

  constructor(endNode: Node, targetNode: Node) {
    super(SetEndNodeCommand.type, { endNode, targetNode });
  }
}
