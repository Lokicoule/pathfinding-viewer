import { AnimationStoppedEvent, StopAnimationCommand } from "@domain/animation";
import { CommandHandlerContract } from "@infra/cqrs";
import { Mediator } from "@infra/mediator";
import { AnimationStore } from "@infra/stores";

export class StopAnimationCommandHandler
  implements CommandHandlerContract<StopAnimationCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly animationStore: AnimationStore
  ) {}

  execute(): void {
    this.animationStore.setPlayback("STOP");

    this.mediator.sendEvent(new AnimationStoppedEvent());
  }
}
