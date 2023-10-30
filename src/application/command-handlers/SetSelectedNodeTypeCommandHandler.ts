import { SetSelectedNodeTypeCommand } from "../../domain/commands/SetSelectedNodeTypeCommand";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../stores/ExperienceStore";

export class SetSelectedNodeTypeCommandHandler
  implements CommandHandler<SetSelectedNodeTypeCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(command: SetSelectedNodeTypeCommand): void {
    this.experienceStore.setSelectedNodeType(command.nodeType);
  }
}
