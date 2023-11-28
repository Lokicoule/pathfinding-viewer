import { CommandHandlerContract } from "@infra/cqrs";
import { AddWallsCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class AddWallsCommandHandler
  implements CommandHandlerContract<AddWallsCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: AddWallsCommand) {
    this.gridStore.addWalls(nodes);
  }
}
