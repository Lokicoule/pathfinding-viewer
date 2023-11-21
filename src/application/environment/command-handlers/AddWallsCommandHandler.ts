import { AddWallsCommand } from "@domain/commands/grid/AddWallsCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class AddWallsCommandHandler implements CommandHandler<AddWallsCommand> {
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: AddWallsCommand): void {
    console.log("AddWallsCommandHandler.execute", { nodes });

    this.gridStore.addWalls(nodes);
  }
}
