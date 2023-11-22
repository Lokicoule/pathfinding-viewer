import { Command } from "../../interfaces/Command";

export class StopPathfindingCommand extends Command {
  public static readonly type = "StopPathfindingCommand";

  constructor() {
    super(StopPathfindingCommand.type);
  }
}
