import { ClearPathAndExploredNodesCommand } from "@/domain/environment";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { GridStore } from "@infra/stores";

export class ClearPathAndExploredNodesCommandHandler
  implements ICommandHandler<ClearPathAndExploredNodesCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Path", "Explored", "Highlighted");
  }
}
