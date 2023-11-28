import { BaseCommand } from "@infra/cqrs/command/models";

export class ResetGridCommand extends BaseCommand {
  public static readonly commandName = "command:reset-grid";
}
