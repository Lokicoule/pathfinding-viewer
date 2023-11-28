import { StopAnimationCommand } from "@/domain/animation/commands/StopAnimationCommand";
import { AnimationStoppedEvent } from "@/domain/animation/events/AnimationStoppedEvent";
import { Mediator } from "@/infrastructure/mediator";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { AnimationStore } from "@/infrastructure/stores";

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
