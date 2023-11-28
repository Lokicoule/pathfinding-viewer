import { ResumeAnimationCommand } from "@/domain/animation/commands/ResumeAnimationCommand";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { AnimationStore } from "@/infrastructure/stores";

export class ResumeAnimationCommandHandler
  implements CommandHandlerContract<ResumeAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("RESUME");
  }
}
