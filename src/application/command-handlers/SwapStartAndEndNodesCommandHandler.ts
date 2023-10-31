import { SwapStartAndEndNodesCommand } from "../../domain/commands/SwapStartAndEndNodesCommand";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";

export class SwapStartAndEndNodesCommandHandler
  implements CommandHandler<SwapStartAndEndNodesCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    const result = this.gridStore.swapStartAndEndNodes();

    if (!result.success) {
      console.error("SwapStartAndEndNodesCommandHandler", result.error);
      return;
    }
  }
}
