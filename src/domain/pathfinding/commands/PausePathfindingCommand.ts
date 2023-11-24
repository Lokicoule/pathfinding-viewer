import { CommandBase } from "@/infrastructure/mediator";

export class PausePathfindingCommand extends CommandBase {
  public static readonly type = "PausePathfindingCommand";

  constructor() {
    super(PausePathfindingCommand.type);
  }
}
