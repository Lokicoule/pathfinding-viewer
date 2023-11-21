import { StopAlgorithmCommand } from "@domain/algorithm";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AlgorithmStore } from "@infra/stores";

export class StopAlgorithmCommandHandler
  implements CommandHandler<StopAlgorithmCommand>
{
  constructor(private readonly algorithmStore: AlgorithmStore) {}

  execute(): void {
    this.algorithmStore.stopAlgorithm();
  }
}
