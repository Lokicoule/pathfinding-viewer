import { Command } from "../../interfaces/Command";
import { MazeAlgorithmType } from "../../types/MazeAlgorithmType";

export class PlayMazeCommand extends Command {
  constructor(public readonly algorithm: MazeAlgorithmType) {
    super("PlayMazeCommand");
  }
}
