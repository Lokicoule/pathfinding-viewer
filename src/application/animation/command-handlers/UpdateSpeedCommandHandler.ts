import { UpdateSpeedCommand } from "@domain/animation";
import { CommandHandlerContract } from "@infra/cqrs";
import { AnimationStore } from "@infra/stores";

export class UpdateSpeedCommandHandler
  implements CommandHandlerContract<UpdateSpeedCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(command: UpdateSpeedCommand): void {
    this.animationStore.setSpeed(command.speed);
  }
}
