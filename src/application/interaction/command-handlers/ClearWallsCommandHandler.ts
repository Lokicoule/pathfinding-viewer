import { ClearWallsCommand } from "@domain/commands/ClearWallsCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { ExperienceStore } from "@infra/stores/ExperienceStore";
import { GridStore } from "@infra/stores/GridStore";

export class ClearWallsCommandHandler
  implements CommandHandler<ClearWallsCommand>
{
  constructor(
    private readonly experienceStore: ExperienceStore,
    private readonly gridStore: GridStore
  ) {}

  execute(): void {
    this.gridStore.clear("Wall");

    this.experienceStore.reset();
  }
}
