import { BaseCommand } from "@/infrastructure/mediator";

export class ResumeAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:resume-animation";
}
