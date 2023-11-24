import { AlgorithmUpdatedEvent } from "@/domain/algorithm/events/AlgorithmUpdatedEvent";
import { CommandHandler, Mediator } from "@/infrastructure/mediator";
import { SetAlgorithmCommand } from "@domain/algorithm";
import { AlgorithmStore } from "@infra/stores/AlgorithmStore";

export class SetAlgorithmCommandHandler implements CommandHandler {
  constructor(
    private readonly mediator: Mediator,
    private readonly algorithmStore: AlgorithmStore
  ) {}

  execute({ payload }: SetAlgorithmCommand) {
    this.algorithmStore.setAlgorithm(payload.algorithm);

    this.mediator.sendEvent(new AlgorithmUpdatedEvent());
  }
}
