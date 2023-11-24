import { CommandBase } from "@/infrastructure/mediator";

export class ResumePathfindingCommand extends CommandBase {
  public static readonly type = "ResumePathfindingCommand";

  constructor() {
    super(ResumePathfindingCommand.type);
  }
}
