import { UpdateSpeedCommand } from "../../../domain/commands/UpdateSpeedCommand";
import { CommandHandler } from "../../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../../infrastructure/stores/ExperienceStore";

export class UpdateSpeedCommandHandler
  implements CommandHandler<UpdateSpeedCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(command: UpdateSpeedCommand): void {
    this.experienceStore.setSpeed(command.speed);
  }
}
