import { Command } from "../../interfaces/Command";
import { PathfindingAlgorithmType } from "../types/PathfindingAlgorithmType";

export class PlayPathfindingCommand extends Command {
  constructor(public readonly algorithm: PathfindingAlgorithmType) {
    super("PlayPathfindingCommand");
  }
}
