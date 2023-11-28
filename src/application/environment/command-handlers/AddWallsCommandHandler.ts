import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { AddWallsCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class AddWallsCommandHandler
  implements ICommandHandler<AddWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: AddWallsCommand) {
    this.gridStore.addWalls(nodes);
  }
}
