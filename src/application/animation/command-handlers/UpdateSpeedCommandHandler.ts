import { AnimationStore } from "@/infrastructure/stores";
import { UpdateSpeedCommand } from "@/domain/animation/commands/UpdateSpeedCommand";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";

export class UpdateSpeedCommandHandler
  implements CommandHandlerContract<UpdateSpeedCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(command: UpdateSpeedCommand): void {
    this.animationStore.setSpeed(command.speed);
  }
}
