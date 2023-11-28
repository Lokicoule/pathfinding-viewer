import { BaseCommand } from "@/infrastructure/mediator";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class PathfindingRunnerCommand extends BaseCommand {
  public static readonly commandName = "command:pathfinding-runner";

  constructor(public readonly algorithm: PathfindingAlgorithmType) {
    super();
  }
}
