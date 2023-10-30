import { SetLastInteractedNodeCommand } from "../../domain/commands/SetLastInteractedNodeCommand";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";
import { ExperienceStore } from "../stores/ExperienceStore";

export class SetLastInteractedNodeCommandHandler
  implements CommandHandler<SetLastInteractedNodeCommand>
{
  constructor(private readonly experienceStore: ExperienceStore) {}

  execute(command: SetLastInteractedNodeCommand): void {
    this.experienceStore.setLastInteractedNode(command.node);
  }
}
