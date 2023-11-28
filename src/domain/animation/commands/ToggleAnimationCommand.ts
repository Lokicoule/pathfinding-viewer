import { BaseCommand } from "@infra/cqrs/command/models";

export class ToggleAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:toggle-animation";
}
