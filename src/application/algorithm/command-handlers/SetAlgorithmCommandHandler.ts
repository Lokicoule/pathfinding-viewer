import { SetAlgorithmCommand } from "../../../domain/commands/SetAlgorithmCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";

export class SetAlgorithmCommandHandler
  implements CommandHandler<SetAlgorithmCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(command: SetAlgorithmCommand): void {
    this.experienceStore.setAlgorithm(command.algorithm);
  }
}
