import { BaseCommand } from "@infra/cqrs/command/models";

export class UnlockEnvironmentCommand extends BaseCommand {
  public static readonly commandName = "command:unlock-environment";
}
