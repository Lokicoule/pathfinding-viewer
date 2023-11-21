import { StopAlgorithmCommand } from "@domain/commands/algorithm";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AlgorithmStore } from "@infra/stores/AlgorithmStore";

export class StopAlgorithmCommandHandler
  implements CommandHandler<StopAlgorithmCommand>
{
  constructor(private readonly algorithmStore: AlgorithmStore) {}

  execute(): void {
    this.algorithmStore.stopAlgorithm();
  }
}
