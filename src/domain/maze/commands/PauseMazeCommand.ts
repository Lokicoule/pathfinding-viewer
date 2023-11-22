import { Command } from "../../interfaces/Command";

export class PauseMazeCommand extends Command {
  public static readonly type = "PauseMazeCommand";

  constructor() {
    super(PauseMazeCommand.type);
  }
}
