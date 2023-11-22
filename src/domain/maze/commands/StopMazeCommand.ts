import { Command } from "../../interfaces/Command";

export class StopMazeCommand extends Command {
  public static readonly type = "StopMazeCommand";

  constructor() {
    super(StopMazeCommand.type);
  }
}
