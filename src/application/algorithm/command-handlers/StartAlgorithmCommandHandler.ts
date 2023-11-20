import { StartAlgorithmCommand } from "@domain/commands/StartAlgorithmCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { ExperienceStore } from "@infra/stores/ExperienceStore";

export class StartAlgorithmCommandHandler
  implements CommandHandler<StartAlgorithmCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(): void {
    this.experienceStore.startAlgorithm();
  }
}
