import { CommandHandler } from "@/infrastructure/mediator";
import { SetStartNodeCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class SetStartNodeCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute({ payload: { startNode, targetNode } }: SetStartNodeCommand): void {
    if (this.gridStore.getStartNode().equalsVector(startNode.getVector())) {
      this.gridStore.setStartNode(targetNode.getVector());
    } else {
      throw new Error(
        "Cannot set start node if it is not the current start node"
      );
    }
  }
}
