import { Command } from "../../interfaces/Command";

export class ClearPathAndExploredNodesCommand extends Command {
  public static readonly type = "ClearPathAndExploredNodesCommand";

  constructor() {
    super(ClearPathAndExploredNodesCommand.type);
  }
}
