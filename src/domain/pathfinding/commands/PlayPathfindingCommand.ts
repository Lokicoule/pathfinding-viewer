import { Command } from "../../interfaces/Command";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class PlayPathfindingCommand extends Command {
  public static readonly type = "PlayPathfindingCommand";

  constructor(public readonly algorithm: PathfindingAlgorithmType) {
    super(PlayPathfindingCommand.type);
  }
}
