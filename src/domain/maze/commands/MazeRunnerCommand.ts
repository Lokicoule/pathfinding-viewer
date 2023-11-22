import { Command } from "../../interfaces/Command";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";

export class MazeRunnerCommand extends Command {
  public static readonly type = "MazeRunnerCommand";

  constructor(public readonly algorithm: MazeAlgorithmType) {
    super(MazeRunnerCommand.type);
  }
}
