import { CommandHandlerContract } from "@infra/cqrs";
import { SwapStartAndEndNodesCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class SwapStartAndEndNodesCommandHandler
  implements CommandHandlerContract<SwapStartAndEndNodesCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ startNode, endNode }: SwapStartAndEndNodesCommand): void {
    if (
      this.gridStore.getStartNode().equalsVector(startNode.getVector()) &&
      this.gridStore.getEndNode().equalsVector(endNode.getVector())
    ) {
      this.gridStore.swapStartAndEndNodes();
    } else {
      throw new Error(
        "Cannot swap start and end nodes if they are not the current start and end nodes"
      );
    }
  }
}
