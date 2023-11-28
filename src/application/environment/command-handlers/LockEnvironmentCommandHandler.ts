import {
  EnvironmentLockedEvent,
  LockEnvironmentCommand,
} from "@domain/environment";
import { CommandHandlerContract } from "@infra/cqrs";
import { Mediator } from "@infra/mediator";
import { EnvironmentStore } from "@infra/stores";

export class LockEnvironmentCommandHandler
  implements CommandHandlerContract<LockEnvironmentCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly algorithmStore: EnvironmentStore
  ) {}

  execute(): void {
    this.algorithmStore.lock();

    this.mediator.sendEvent(new EnvironmentLockedEvent());
  }
}
