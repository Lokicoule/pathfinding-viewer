import { ToggleAnimationCommand } from "@domain/commands/animation/ToggleAnimation";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AnimationStore } from "@infra/stores/AnimationStore";

export class ToggleAnimationCommandHandler
  implements CommandHandler<ToggleAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.toggle();
  }
}
