import { ResetGridCommand } from "@/domain/environment";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { GridStore } from "@infra/stores";

export class ResetGridCommandHandler
  implements ICommandHandler<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();
  }
}
