import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { RemoveWallsCommand } from "@domain/environment";
import { GridStore } from "@infra/stores";

export class RemoveWallsCommandHandler implements CommandHandlerContract {
  constructor(private readonly gridStore: GridStore) {}

  execute({ nodes }: RemoveWallsCommand): void {
    this.gridStore.removeWalls(nodes);
  }
}
