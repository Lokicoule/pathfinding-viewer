import { StartAlgorithmCommand } from "@domain/algorithm";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AlgorithmStore } from "@infra/stores";

export class StartAlgorithmCommandHandler
  implements CommandHandler<StartAlgorithmCommand>
{
  constructor(private readonly algorithmStore: AlgorithmStore) {}

  execute(): void {
    this.algorithmStore.startAlgorithm();
  }
}
