import { AnimationStore } from "@/infrastructure/stores";
import { UpdateSpeedCommand } from "@/domain/animation/commands/UpdateSpeedCommand";
import { CommandHandler } from "@/infrastructure/mediator";

export class UpdateSpeedCommandHandler implements CommandHandler {
  constructor(private readonly animationStore: AnimationStore) {}

  execute(command: UpdateSpeedCommand): void {
    this.animationStore.setSpeed(command.speed);
  }
}
