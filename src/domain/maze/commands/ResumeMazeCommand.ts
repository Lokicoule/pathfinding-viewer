import { Command } from "../../interfaces/Command";

export class ResumeMazeCommand extends Command {
  public static readonly type = "ResumeMazeCommand";

  constructor() {
    super(ResumeMazeCommand.type);
  }
}
