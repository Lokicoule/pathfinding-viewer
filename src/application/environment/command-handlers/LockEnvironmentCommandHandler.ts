import { EnvironmentLockedEvent } from "@/domain/environment/events/EnvironmentLockedEvent";
import { CommandHandler, Mediator } from "@/infrastructure/mediator";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";

export class LockEnvironmentCommandHandler implements CommandHandler {
  constructor(
    private readonly mediator: Mediator,
    private readonly algorithmStore: EnvironmentStore
  ) {}

  execute(): void {
    this.algorithmStore.lock();

    console.log(
      "LockEnvironmentCommandHandler",
      this.algorithmStore.isLocked()
    );

    this.mediator.sendEvent(new EnvironmentLockedEvent());
  }
}
