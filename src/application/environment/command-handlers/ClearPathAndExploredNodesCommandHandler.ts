import { ClearPathAndExploredNodesCommand } from "@domain/environment";
import { CommandHandlerContract } from "@infra/cqrs";
import { GridStore } from "@infra/stores";

export class ClearPathAndExploredNodesCommandHandler
  implements CommandHandlerContract<ClearPathAndExploredNodesCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Path", "Explored", "Highlighted");
  }
}
