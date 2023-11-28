import { BaseCommand } from "@/infrastructure/mediator";

export class ClearWallsCommand extends BaseCommand {
  public static readonly commandName = "command:clear-walls";
}
