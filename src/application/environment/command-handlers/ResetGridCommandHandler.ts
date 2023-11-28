import { ResetGridCommand } from "@/domain/environment";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { GridStore } from "@infra/stores";

export class ResetGridCommandHandler
  implements CommandHandlerContract<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();
  }
}
