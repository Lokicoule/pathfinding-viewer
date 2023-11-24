import { CommandBase } from "@/infrastructure/mediator";

export class StopMazeCommand extends CommandBase {
  public static readonly type = "StopMazeCommand";

  constructor() {
    super(StopMazeCommand.type);
  }
}
