import { BaseCommand } from "@infra/cqrs/command/models";

export class StopAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:stop-animation";
}
