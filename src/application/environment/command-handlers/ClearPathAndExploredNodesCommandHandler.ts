import { ClearPathAndExploredNodesCommand } from "@domain/commands/environment/ClearPathAndExploredNodesCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class ClearPathAndExploredNodesCommandHandler
  implements CommandHandler<ClearPathAndExploredNodesCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Path", "Explored", "Highlighted");
  }
}
