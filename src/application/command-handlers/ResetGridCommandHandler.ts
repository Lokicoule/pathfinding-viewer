import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { NodeType } from "../../domain/enums/NodeType";
import { GridResetEvent } from "../../domain/events/GridResetedEvent";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { Mediator } from "../../infrastructure/mediator/Mediator";
import { GridStore } from "../../infrastructure/stores/GridStore";

export class ResetGridCommandHandler
  implements CommandHandler<ResetGridCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly gridStore: GridStore
  ) {}

  handle(): void {
    console.log("ResetGridCommandHandler");

    const grid = this.gridStore.getGrid();

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        const node = grid[y][x];
        if (
          node.getType() !== NodeType.Start &&
          node.getType() !== NodeType.End
        ) {
          this.gridStore.setNodeType(x, y, NodeType.Empty);
        }
      }
    }

    this.mediator.sendEvent(GridResetEvent.name, new GridResetEvent());
  }
}
