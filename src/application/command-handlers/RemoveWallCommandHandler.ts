import { RemoveWallCommand } from "../../domain/commands/RemoveWallCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";

export class RemoveWallCommandHandler
  implements CommandHandler<RemoveWallCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(command: RemoveWallCommand): void {
    const node = this.gridStore.getNode(command.vector);

    if (!node || node.getType() !== NodeType.Wall) return;

    const result = this.gridStore.setNodeAs(command.vector, NodeType.Empty);

    if (!result.success) {
      console.error("RemoveWallCommandHandler", result.error);
    }
  }
}
