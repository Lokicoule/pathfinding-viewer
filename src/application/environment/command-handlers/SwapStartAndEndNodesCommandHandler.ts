import { CommandHandler } from "@/infrastructure/mediator";
import { SwapStartAndEndNodesCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class SwapStartAndEndNodesCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute({
    payload: { startNode, endNode },
  }: SwapStartAndEndNodesCommand): void {
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
