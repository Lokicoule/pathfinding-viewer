import { SetAlgorithmCommand } from "@domain/algorithm";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { AlgorithmStore } from "@infra/stores/AlgorithmStore";

export class SetAlgorithmCommandHandler
  implements CommandHandler<SetAlgorithmCommand>
{
  constructor(private readonly algorithmStore: AlgorithmStore) {}

  execute(command: SetAlgorithmCommand): void {
    this.algorithmStore.setAlgorithm(command.algorithm);
  }
}
