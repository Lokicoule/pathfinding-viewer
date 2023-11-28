import { AlgorithmUpdatedEvent, SetAlgorithmCommand } from "@domain/algorithm";
import { CommandHandlerContract } from "@infra/cqrs";
import { Mediator } from "@infra/mediator";
import { AlgorithmStore } from "@infra/stores";

export class SetAlgorithmCommandHandler
  implements CommandHandlerContract<SetAlgorithmCommand>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly algorithmStore: AlgorithmStore
  ) {}

  execute({ algorithm }: SetAlgorithmCommand) {
    this.algorithmStore.setAlgorithm(algorithm);

    this.mediator.sendEvent(new AlgorithmUpdatedEvent());
  }
}
