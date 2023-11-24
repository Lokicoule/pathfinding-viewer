import { CommandHandler } from "@/infrastructure/mediator";
import { GridStore } from "@infra/stores";

export class ResetGridCommandHandler implements CommandHandler {
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();
  }
}
