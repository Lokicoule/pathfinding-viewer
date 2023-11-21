import { AnimationStore } from "@/infrastructure/stores";
import { UpdateSpeedCommand } from "@domain/commands/animation/UpdateSpeedCommand";
import { CommandHandler } from "@domain/interfaces/CommandHandler";

export class UpdateSpeedCommandHandler
  implements CommandHandler<UpdateSpeedCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(command: UpdateSpeedCommand): void {
    this.animationStore.setSpeed(command.speed);
  }
}
