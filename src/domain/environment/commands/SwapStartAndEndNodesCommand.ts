import { Node } from "@/domain/environment/entities";
import { CommandBaseWithPayload } from "@/infrastructure/mediator";

type SwapStartAndEndNodesCommandPayload = {
  startNode: Node;
  endNode: Node;
};

export class SwapStartAndEndNodesCommand extends CommandBaseWithPayload<SwapStartAndEndNodesCommandPayload> {
  public static readonly type = "SwapStartAndEndNodesCommand";

  constructor(startNode: Node, endNode: Node) {
    super(SwapStartAndEndNodesCommand.type, { startNode, endNode });
  }
}
