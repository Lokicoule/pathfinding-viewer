import { StartAlgorithmCommand } from "@domain/commands/algorithm";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AlgorithmStore } from "@infra/stores/AlgorithmStore";

export class StartAlgorithmCommandHandler
  implements CommandHandler<StartAlgorithmCommand>
{
  constructor(private readonly algorithmStore: AlgorithmStore) {}

  execute(): void {
    this.algorithmStore.startAlgorithm();
  }
}
