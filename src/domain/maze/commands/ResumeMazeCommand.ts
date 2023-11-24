import { CommandBase } from "@/infrastructure/mediator";

export class ResumeMazeCommand extends CommandBase {
  public static readonly type = "ResumeMazeCommand";

  constructor() {
    super(ResumeMazeCommand.type);
  }
}
