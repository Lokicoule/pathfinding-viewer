import { BaseCommand } from "@infra/cqrs/command/models";

export class LockEnvironmentCommand extends BaseCommand {
  public static readonly commandName = "command:lock-environment";
}
