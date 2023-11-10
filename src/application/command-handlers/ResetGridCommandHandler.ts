import { compositionRoot } from "../../bootstrapping/bootstrap";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { GridStore } from "../stores/GridStore";

export class ResetGridCommandHandler
  implements CommandHandler<ResetGridCommand>
{
  constructor(private readonly gridStore: GridStore) {}

  execute(): void {
    this.gridStore.reset();

    compositionRoot.stores.experienceStore.reset();
  }
}
