import { Command } from "../../interfaces/Command";

export class StartAlgorithmCommand extends Command {
  public static readonly type = "StartAlgorithmCommand";

  constructor() {
    super(StartAlgorithmCommand.type);
  }
}
