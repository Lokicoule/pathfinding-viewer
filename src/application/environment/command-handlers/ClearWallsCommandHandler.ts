import { ClearWallsCommand } from "@domain/environment";
import { CommandHandlerContract } from "@infra/cqrs";
import { GridStore } from "@infra/stores";

export class ClearWallsCommandHandler
  implements CommandHandlerContract<ClearWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Wall");
  }
}
