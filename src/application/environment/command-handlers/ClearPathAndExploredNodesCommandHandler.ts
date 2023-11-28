import { ClearPathAndExploredNodesCommand } from "@/domain/environment";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { GridStore } from "@infra/stores";

export class ClearPathAndExploredNodesCommandHandler
  implements CommandHandlerContract<ClearPathAndExploredNodesCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Path", "Explored", "Highlighted");
  }
}
