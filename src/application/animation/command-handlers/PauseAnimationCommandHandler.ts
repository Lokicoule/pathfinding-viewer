import { PauseAnimationCommand } from "@domain/animation";
import { CommandHandlerContract } from "@infra/cqrs";
import { AnimationStore } from "@infra/stores";

export class PauseAnimationCommandHandler
  implements CommandHandlerContract<PauseAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("PAUSE");
  }
}
