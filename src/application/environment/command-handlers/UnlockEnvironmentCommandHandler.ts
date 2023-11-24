import { EnvironmentUnlockedEvent } from "@/domain/environment/events/EnvironmentUnlockedEvent";
import { CommandHandler, Mediator } from "@/infrastructure/mediator";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";

export class UnlockEnvironmentCommandHandler implements CommandHandler {
  constructor(
    private readonly mediator: Mediator,
    private readonly algorithmStore: EnvironmentStore
  ) {}

  execute(): void {
    this.algorithmStore.unlock();

    this.mediator.sendEvent(new EnvironmentUnlockedEvent());
  }
}
