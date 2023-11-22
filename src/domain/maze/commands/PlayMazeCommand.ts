import { Command } from "../../interfaces/Command";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";

export class PlayMazeCommand extends Command {
  public static readonly type = "PlayMazeCommand";

  constructor(public readonly algorithm: MazeAlgorithmType) {
    super(PlayMazeCommand.type);
  }
}
