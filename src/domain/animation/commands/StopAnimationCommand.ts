import { BaseCommand } from "@/infrastructure/mediator";

export class StopAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:stop-animation";
}
