import { AnimationStore } from "@/infrastructure/stores";
import { UpdateSpeedCommand } from "@/domain/animation/commands/UpdateSpeedCommand";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";

export class UpdateSpeedCommandHandler
  implements ICommandHandler<UpdateSpeedCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(command: UpdateSpeedCommand): void {
    this.animationStore.setSpeed(command.speed);
  }
}
