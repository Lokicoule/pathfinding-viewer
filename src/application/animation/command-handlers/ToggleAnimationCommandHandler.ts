import { ToggleAnimationCommand } from "@/domain/animation";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";
import { AnimationStore } from "@infra/stores/AnimationStore";

export class ToggleAnimationCommandHandler
  implements ICommandHandler<ToggleAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.toggle();
  }
}
