import { Command } from "../../interfaces/Command";

export class ResetGridCommand extends Command {
  public static readonly type = "ResetGridCommand";

  constructor() {
    super(ResetGridCommand.type);
  }
}
