import { ClearWallsCommand } from "@/domain/environment";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { GridStore } from "@infra/stores";

export class ClearWallsCommandHandler
  implements ICommandHandler<ClearWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Wall");
  }
}
