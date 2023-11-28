import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { RemoveWallsCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class RemoveWallsCommandHandler implements ICommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: RemoveWallsCommand): void {
    this.gridStore.removeWalls(nodes);
  }
}
