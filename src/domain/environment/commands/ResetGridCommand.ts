import { BaseCommand } from "@/infrastructure/mediator";

export class ResetGridCommand extends BaseCommand {
  public static readonly commandName = "command:reset-grid";
}
