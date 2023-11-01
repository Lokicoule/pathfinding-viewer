import { Command } from "../interfaces/Command";
import { MazeAlgorithmType } from "../types/AlgorithmType";

export class MazeGenerationRunnerCommand extends Command {
  constructor(public readonly algorithm: MazeAlgorithmType) {
    super("MazeGenerationRunnerCommand");
  }
}
