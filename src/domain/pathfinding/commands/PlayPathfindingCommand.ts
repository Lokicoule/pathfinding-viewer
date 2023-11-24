import { CommandBaseWithPayload } from "@/infrastructure/mediator";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

type PathfindingRunnerCommandPayload = {
  algorithm: PathfindingAlgorithmType;
};
export class PlayPathfindingCommand extends CommandBaseWithPayload<PathfindingRunnerCommandPayload> {
  public static readonly type = "PlayPathfindingCommand";

  constructor(algorithm: PathfindingAlgorithmType) {
    super(PlayPathfindingCommand.type, { algorithm });
  }
}
