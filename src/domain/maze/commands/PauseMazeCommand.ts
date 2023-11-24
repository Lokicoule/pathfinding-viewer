import { CommandBase } from "@/infrastructure/mediator";

export class PauseMazeCommand extends CommandBase {
  public static readonly type = "PauseMazeCommand";

  constructor() {
    super(PauseMazeCommand.type);
  }
}
