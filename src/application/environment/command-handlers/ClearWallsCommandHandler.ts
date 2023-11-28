import { ClearWallsCommand } from "@/domain/environment";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { GridStore } from "@infra/stores";

export class ClearWallsCommandHandler
  implements CommandHandlerContract<ClearWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Wall");
  }
}
