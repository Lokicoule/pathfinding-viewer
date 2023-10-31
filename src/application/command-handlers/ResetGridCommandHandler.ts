import { compositionRoot } from "../../bootstrapping/bootstrap";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";

export class ResetGridCommandHandler
  implements CommandHandler<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    const grid = this.gridStore.getGrid();

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        const node = grid[y][x];
        if (
          node.getType() !== NodeType.Start &&
          node.getType() !== NodeType.End
        ) {
          this.gridStore.setNodeAs(node.getVector(), NodeType.Empty);
        }
      }
    }

    compositionRoot.stores.experienceStore.reset();
  }
}
