import { ClearWallsCommand } from "@domain/environment";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores";

export class ClearWallsCommandHandler
  implements CommandHandler<ClearWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Wall");
  }
}
