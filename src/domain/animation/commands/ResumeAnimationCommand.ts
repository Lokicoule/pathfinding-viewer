import { BaseCommand } from "@infra/cqrs/command/models";

export class ResumeAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:resume-animation";
}
