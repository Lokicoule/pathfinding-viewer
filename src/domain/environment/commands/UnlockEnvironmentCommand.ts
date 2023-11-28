import { BaseCommand } from "@/infrastructure/mediator";

export class UnlockEnvironmentCommand extends BaseCommand {
  public static readonly commandName = "command:unlock-environment";
}
