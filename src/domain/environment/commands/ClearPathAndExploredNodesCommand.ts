import { CommandBase } from "@/infrastructure/mediator";

export class ClearPathAndExploredNodesCommand extends CommandBase {
  public static readonly type = "ClearPathAndExploredNodesCommand";

  constructor() {
    super(ClearPathAndExploredNodesCommand.type);
  }
}
