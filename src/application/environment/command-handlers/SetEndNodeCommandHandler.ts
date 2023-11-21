import { SetEndNodeCommand } from "@/domain/commands/grid/SetEndNodeCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class SetEndNodeCommandHandler
  implements CommandHandler<SetEndNodeCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ endNode, targetNode }: SetEndNodeCommand): void {
    console.log("SetEndNodeCommandHandler.execute", {
      endNode,
      targetNode,
    });

    if (this.gridStore.getEndNode().equalsVector(endNode.getVector())) {
      this.gridStore.setEndNode(targetNode.getVector());
    } else {
      throw new Error("Cannot set end node if it is not the current end node");
    }
  }
}
