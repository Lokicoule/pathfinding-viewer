import { RemoveWallsCommand } from "@domain/environment";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores";

export class RemoveWallsCommandHandler
  implements CommandHandler<RemoveWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: RemoveWallsCommand): void {
    this.gridStore.removeWalls(nodes);
  }
}
