import { ToggleAnimationCommand } from "@domain/animation";
import { CommandHandlerContract } from "@infra/cqrs";
import { AnimationStore } from "@infra/stores";

export class ToggleAnimationCommandHandler
  implements CommandHandlerContract<ToggleAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.toggle();
  }
}
