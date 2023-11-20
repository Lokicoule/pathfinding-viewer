import { StopAlgorithmCommand } from "@domain/commands/StopAlgorithmCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { ExperienceStore } from "@infra/stores/ExperienceStore";

export class StopAlgorithmCommandHandler
  implements CommandHandler<StopAlgorithmCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(): void {
    this.experienceStore.stopAlgorithm();
  }
}
