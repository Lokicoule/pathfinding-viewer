import { CommandHandler } from "@/infrastructure/mediator";
import { SetEndNodeCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class SetEndNodeCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute({ payload: { endNode, targetNode } }: SetEndNodeCommand): void {
    if (this.gridStore.getEndNode().equalsVector(endNode.getVector())) {
      this.gridStore.setEndNode(targetNode.getVector());
    } else {
      throw new Error("Cannot set end node if it is not the current end node");
    }
  }
}
