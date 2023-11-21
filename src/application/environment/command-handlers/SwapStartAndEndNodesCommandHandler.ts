import { SwapStartAndEndNodesCommand } from "@domain/commands/environment/SwapStartAndEndNodesCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class SwapStartAndEndNodesCommandHandler
  implements CommandHandler<SwapStartAndEndNodesCommand>
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
