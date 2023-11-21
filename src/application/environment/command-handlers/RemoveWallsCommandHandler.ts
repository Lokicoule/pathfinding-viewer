import { RemoveWallsCommand } from "@/domain/environment/commands/RemoveWallsCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class RemoveWallsCommandHandler
  implements CommandHandler<RemoveWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: RemoveWallsCommand): void {
    this.gridStore.removeWalls(nodes);
  }
}