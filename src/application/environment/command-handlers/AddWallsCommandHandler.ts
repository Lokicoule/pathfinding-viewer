import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
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
