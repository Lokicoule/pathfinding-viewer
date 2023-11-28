import { BaseCommand } from "@infra/cqrs/command/models";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class PathfindingRunnerCommand extends BaseCommand {
  public static readonly commandName = "command:pathfinding-runner";

  constructor(public readonly algorithm: PathfindingAlgorithmType) {
    super();
  }
}
