import { BaseCommand } from "@/infrastructure/mediator";

export class PauseAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:pause-animation";
}
