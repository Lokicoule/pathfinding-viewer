import { ResetGridCommand } from "@domain/commands/ResetGridCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { ExperienceStore } from "@infra/stores/ExperienceStore";
import { GridStore } from "@infra/stores/GridStore";

export class ResetGridCommandHandler
  implements CommandHandler<ResetGridCommand>
{
  constructor(
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {}

  execute(): void {
    this.gridStore.reset();
    this.experienceStore.reset();
  }
}
