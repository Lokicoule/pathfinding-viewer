import { CommandBase } from "@/infrastructure/mediator";

export class ClearWallsCommand extends CommandBase {
  public static readonly type = "ClearWallsCommand";

  constructor() {
    super(ClearWallsCommand.type);
  }
}
