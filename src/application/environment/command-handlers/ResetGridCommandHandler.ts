import { ResetGridCommand } from "@domain/environment";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores";

export class ResetGridCommandHandler
  implements CommandHandler<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();
  }
}
