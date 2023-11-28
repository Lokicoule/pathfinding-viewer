import {
  EnvironmentUnlockedEvent,
  UnlockEnvironmentCommand,
} from "@domain/environment";
import { CommandHandlerContract } from "@infra/cqrs";
import { Mediator } from "@infra/mediator";
import { EnvironmentStore } from "@infra/stores";

export class UnlockEnvironmentCommandHandler
  implements CommandHandlerContract<UnlockEnvironmentCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly algorithmStore: EnvironmentStore
  ) {}

  execute(): void {
    this.algorithmStore.unlock();

    this.mediator.sendEvent(new EnvironmentUnlockedEvent());
  }
}
