import { SetStartNodeCommand } from "@/domain/commands/grid/SetStartNodeCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class SetStartNodeCommandHandler
  implements CommandHandler<SetStartNodeCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ startNode, targetNode }: SetStartNodeCommand): void {
    console.log("SetStartNodeCommandHandler.execute", {
      startNode,
      targetNode,
    });

    if (this.gridStore.getStartNode().equalsVector(startNode.getVector())) {
      this.gridStore.setStartNode(targetNode.getVector());
    } else {
      throw new Error(
        "Cannot set start node if it is not the current start node"
      );
    }
  }
}
