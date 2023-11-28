import { BaseCommand } from "@infra/cqrs/command/models";

export class PauseAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:pause-animation";
}
