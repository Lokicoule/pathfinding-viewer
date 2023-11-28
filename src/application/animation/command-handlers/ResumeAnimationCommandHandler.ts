import { ResumeAnimationCommand } from "@domain/animation";
import { CommandHandlerContract } from "@infra/cqrs";
import { AnimationStore } from "@infra/stores";

export class ResumeAnimationCommandHandler
  implements CommandHandlerContract<ResumeAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.setPlayback("RESUME");
  }
}
