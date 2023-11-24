import { CommandBase } from "@/infrastructure/mediator";

export class StopPathfindingCommand extends CommandBase {
  public static readonly type = "StopPathfindingCommand";

  constructor() {
    super(StopPathfindingCommand.type);
  }
}
