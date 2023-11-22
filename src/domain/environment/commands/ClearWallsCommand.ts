import { Command } from "../../interfaces/Command";

export class ClearWallsCommand extends Command {
  public static readonly type = "ClearWallsCommand";

  constructor() {
    super(ClearWallsCommand.type);
  }
}
