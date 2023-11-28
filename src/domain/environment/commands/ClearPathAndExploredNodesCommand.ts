import { BaseCommand } from "@/infrastructure/mediator";

export class ClearPathAndExploredNodesCommand extends BaseCommand {
  public static readonly commandName = "command:clear-path-and-explored-nodes";
}
