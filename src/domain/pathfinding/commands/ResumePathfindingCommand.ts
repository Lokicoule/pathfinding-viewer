import { Command } from "../../interfaces/Command";

export class ResumePathfindingCommand extends Command {
  public static readonly type = "ResumePathfindingCommand";

  constructor() {
    super(ResumePathfindingCommand.type);
  }
}
