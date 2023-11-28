import { PauseAnimationCommand } from "@/domain/animation/commands/PauseAnimationCommand";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { AnimationStore } from "@/infrastructure/stores";

export class PauseAnimationCommandHandler
  implements CommandHandlerContract<PauseAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("PAUSE");
  }
}
