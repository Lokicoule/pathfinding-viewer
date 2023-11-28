import { LockEnvironmentCommand } from "@/domain/environment";
import { EnvironmentLockedEvent } from "@/domain/environment/events/EnvironmentLockedEvent";
import { Mediator } from "@/infrastructure/mediator";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";

export class LockEnvironmentCommandHandler
  implements CommandHandlerContract<LockEnvironmentCommand>
{
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
