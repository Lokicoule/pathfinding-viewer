import { BaseCommand } from "@/infrastructure/mediator";

export class LockEnvironmentCommand extends BaseCommand {
  public static readonly commandName = "command:lock-environment";
}
