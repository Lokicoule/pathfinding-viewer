import { PauseAnimationCommand } from "@/domain/animation/commands/PauseAnimationCommand";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { AnimationStore } from "@/infrastructure/stores";

export class PauseAnimationCommandHandler
  implements ICommandHandler<PauseAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("PAUSE");
  }
}
