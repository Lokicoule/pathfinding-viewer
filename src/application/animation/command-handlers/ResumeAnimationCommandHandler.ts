import { ResumeAnimationCommand } from "@/domain/animation/commands/ResumeAnimationCommand";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { AnimationStore } from "@/infrastructure/stores";

export class ResumeAnimationCommandHandler
  implements ICommandHandler<ResumeAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("RESUME");
  }
}
