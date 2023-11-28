import { ResetGridCommand } from "@domain/environment";
import { CommandHandlerContract } from "@infra/cqrs";
import { GridStore } from "@infra/stores";

export class ResetGridCommandHandler
  implements CommandHandlerContract<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();
  }
}
