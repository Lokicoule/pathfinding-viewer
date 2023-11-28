import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { SetStartNodeCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class SetStartNodeCommandHandler
  implements CommandHandlerContract<SetStartNodeCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ startNode, targetNode }: SetStartNodeCommand): void {
    if (this.gridStore.getStartNode().equalsVector(startNode.getVector())) {
      this.gridStore.setStartNode(targetNode.getVector());
    } else {
      throw new Error(
        "Cannot set start node if it is not the current start node"
      );
    }
  }
}
