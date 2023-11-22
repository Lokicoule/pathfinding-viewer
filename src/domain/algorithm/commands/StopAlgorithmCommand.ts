import { Command } from "../../interfaces/Command";

export class StopAlgorithmCommand extends Command {
  public static readonly type = "StopAlgorithmCommand";

  constructor() {
    super(StopAlgorithmCommand.type);
  }
}
