import { StartAlgorithmCommand } from "../../../domain/commands/StartAlgorithmCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";

export class StartAlgorithmCommandHandler
  implements CommandHandler<StartAlgorithmCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(command: StartAlgorithmCommand): void {
    this.experienceStore.setAlgorithm(command.algorithm);
    this.experienceStore.startAlgorithm();
  }
}
