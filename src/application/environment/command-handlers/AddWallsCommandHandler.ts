import { CommandHandler } from "@/infrastructure/mediator/contracts/CommandHandler";
import { AddWallsCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class AddWallsCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute({ payload }: AddWallsCommand) {
    this.gridStore.addWalls(payload.nodes);
  }
}
