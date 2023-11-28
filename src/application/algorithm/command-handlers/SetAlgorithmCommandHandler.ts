import { AlgorithmUpdatedEvent } from "@/domain/algorithm/events/AlgorithmUpdatedEvent";
import { Mediator } from "@/infrastructure/mediator";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";
import { SetAlgorithmCommand } from "@domain/algorithm";
import { AlgorithmStore } from "@infra/stores/AlgorithmStore";

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
