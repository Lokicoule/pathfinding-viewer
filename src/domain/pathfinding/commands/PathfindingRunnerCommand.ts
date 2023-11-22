import { Command } from "../../interfaces/Command";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class PathfindingRunnerCommand extends Command {
  public static readonly type = "PathfindingRunnerCommand";

  constructor(public readonly algorithm: PathfindingAlgorithmType) {
    super(PathfindingRunnerCommand.type);
  }
}
