import { CommandHandler } from "@/infrastructure/mediator";
import { AnimationStore } from "@infra/stores/AnimationStore";

export class ToggleAnimationCommandHandler implements CommandHandler {
  constructor(private readonly animationStore: AnimationStore) {}

  execute(): void {
    this.animationStore.toggle();
  }
}
