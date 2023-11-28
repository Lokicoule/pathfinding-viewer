import { BaseCommand } from "@infra/cqrs/command/models";

export class ClearPathAndExploredNodesCommand extends BaseCommand {
  public static readonly commandName = "command:clear-path-and-explored-nodes";
}
