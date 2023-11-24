import { CommandBaseWithPayload } from "@infra/mediator";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

type PathfindingRunnerCommandPayload = {
  algorithm: PathfindingAlgorithmType;
};

export class PathfindingRunnerCommand extends CommandBaseWithPayload<PathfindingRunnerCommandPayload> {
  public static readonly type = "PathfindingRunnerCommand";

  constructor(algorithm: PathfindingAlgorithmType) {
    super(PathfindingRunnerCommand.type, { algorithm });
  }
}
