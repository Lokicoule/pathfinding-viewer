import { Command } from "../interfaces/Command";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class PathfindingRunnerCommand extends Command {
  constructor(public readonly algorithm: PathfindingAlgorithmType) {
    super("PathfindingRunnerCommand");
  }
}
