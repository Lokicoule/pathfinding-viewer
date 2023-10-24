import { SetSelectedNodeTypeCommand } from "../../domain/commands/SetSelectedNodeTypeCommand";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../../infrastructure/stores/ExperienceStore";

export class SetSelectedNodeTypeCommandHandler
  implements CommandHandler<SetSelectedNodeTypeCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(command: SetSelectedNodeTypeCommand): void {
    console.log("SetSelectedNodeTypeCommandHandler", command);

    const { nodeType } = command;

    this.experienceStore.setSelectedNodeType(nodeType);
  }
}
