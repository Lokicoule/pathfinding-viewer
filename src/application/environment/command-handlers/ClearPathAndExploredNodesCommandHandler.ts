import { CommandHandler } from "@/infrastructure/mediator";
import { GridStore } from "@infra/stores";

export class ClearPathAndExploredNodesCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.clear("Path", "Explored", "Highlighted");
  }
}
