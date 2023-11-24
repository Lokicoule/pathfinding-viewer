import { Node } from "@/domain/environment/entities";
import { CommandBaseWithPayload } from "@/infrastructure/mediator";

type SetStartNodeCommandPayload = {
  startNode: Node;
  targetNode: Node;
};

export class SetStartNodeCommand extends CommandBaseWithPayload<SetStartNodeCommandPayload> {
  public static readonly type = "SetStartNodeCommand";

  constructor(startNode: Node, targetNode: Node) {
    super(SetStartNodeCommand.type, { startNode, targetNode });
  }
}
