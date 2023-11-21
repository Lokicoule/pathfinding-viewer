import { ResetGridCommand } from "@/domain/environment/commands/ResetGridCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { GridStore } from "@infra/stores/GridStore";

export class ResetGridCommandHandler
  implements CommandHandler<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();
  }
}
