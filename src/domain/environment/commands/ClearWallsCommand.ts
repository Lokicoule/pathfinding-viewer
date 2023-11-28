import { BaseCommand } from "@infra/cqrs/command/models";

export class ClearWallsCommand extends BaseCommand {
  public static readonly commandName = "command:clear-walls";
}
