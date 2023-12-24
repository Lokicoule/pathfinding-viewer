import { StopAnimationCommand } from "@domain/animation";
import { CommandHandlerContract } from "@infra/cqrs";
import { AnimationStore } from "@infra/stores";

export class StopAnimationCommandHandler
  implements CommandHandlerContract<StopAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("STOP");
  }
}
