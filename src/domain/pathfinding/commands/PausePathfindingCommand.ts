import { Command } from "../../interfaces/Command";

export class PausePathfindingCommand extends Command {
  public static readonly type = "PausePathfindingCommand";

  constructor() {
    super(PausePathfindingCommand.type);
  }
}
