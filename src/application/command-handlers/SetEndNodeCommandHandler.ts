import { SetEndNodeCommand } from "../../domain/commands/SetEndNodeCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";

export class SetEndNodeCommandHandler
  implements CommandHandler<SetEndNodeCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(command: SetEndNodeCommand): void {
    const node = this.gridStore.getNode(command.vector);

    if (!node || [NodeType.Start, NodeType.End].includes(node.getType()))
      return;

    const setEndNodeResult = this.gridStore.setEndNode(command.vector);

    if (!setEndNodeResult.success) {
      console.error(
        `SetEndNodeCommandHandler - setEndNode: ${setEndNodeResult.error}`
      );
      return;
    }
  }
}
