import { CommandHandler } from "@/infrastructure/mediator";
import { RemoveWallsCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class RemoveWallsCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute({ payload }: RemoveWallsCommand): void {
    this.gridStore.removeWalls(payload.nodes);
  }
}
