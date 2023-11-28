import { StopAnimationCommand } from "@/domain/animation/commands/StopAnimationCommand";
import { AnimationStoppedEvent } from "@/domain/animation/events/AnimationStoppedEvent";
import { Mediator } from "@/infrastructure/mediator";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { AnimationStore } from "@/infrastructure/stores";

export class StopAnimationCommandHandler
  implements ICommandHandler<StopAnimationCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly animationStore: AnimationStore
  ) {}

  execute(): void {
    console.log("StopAnimationCommandHandler.execute()");

    this.animationStore.setPlayback("STOP");

    this.mediator.sendEvent(new AnimationStoppedEvent());
  }
}
