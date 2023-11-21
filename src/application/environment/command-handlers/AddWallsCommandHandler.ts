import { AddWallsCommand } from "@domain/commands/environment/AddWallsCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class AddWallsCommandHandler implements CommandHandler<AddWallsCommand> {
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: AddWallsCommand): void {
    this.gridStore.addWalls(nodes);
  }
}
