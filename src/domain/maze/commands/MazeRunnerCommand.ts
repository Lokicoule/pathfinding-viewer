import { Command } from "../../interfaces/Command";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";

export class MazeRunnerCommand extends Command {
  constructor(public readonly algorithm: MazeAlgorithmType) {
    super("MazeRunnerCommand");
  }
}
