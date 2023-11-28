import { BaseCommand } from "@/infrastructure/mediator";

export class ToggleAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:toggle-animation";
}
