import { UnlockEnvironmentCommand } from "@/domain/environment";
import { EnvironmentUnlockedEvent } from "@/domain/environment/events/EnvironmentUnlockedEvent";
import { Mediator } from "@/infrastructure/mediator";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";

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
