import { ToggleAnimationCommand } from "@/domain/animation";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { AnimationStore } from "@infra/stores/AnimationStore";

export class ToggleAnimationCommandHandler
  implements CommandHandlerContract<ToggleAnimationCommand>
{
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.toggle();
  }
}
