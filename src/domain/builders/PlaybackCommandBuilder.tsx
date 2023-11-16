import { PauseMazeCommand } from "../commands/maze/PauseMazeCommand";
import { PlayMazeCommand } from "../commands/maze/PlayMazeCommand";
import { ResumeMazeCommand } from "../commands/maze/ResumeMazeCommand";
import { PausePathfindingCommand } from "../commands/pathfinding/PausePathfindingCommand";
import { PlayPathfindingCommand } from "../commands/pathfinding/PlayPathfindingCommand";
import { ResumePathfindingCommand } from "../commands/pathfinding/ResumePathfindingCommand";
import { Command } from "../interfaces/Command";
import { Algorithm } from "../valueObjects/Algorithm";

type CommandTypes = "pause" | "resume" | "play";

export class PlaybackCommandBuilder {
  static build(type: CommandTypes, algorithm: Algorithm): Command {
    switch (type) {
      case "pause":
        return algorithm.isMazeAlgorithm()
          ? new PauseMazeCommand()
          : new PausePathfindingCommand();
      case "resume":
        return algorithm.isMazeAlgorithm()
          ? new ResumeMazeCommand()
          : new ResumePathfindingCommand();
      case "play":
        return algorithm.isMazeAlgorithm()
          ? new PlayMazeCommand(algorithm.getMazeAlgorithm())
          : new PlayPathfindingCommand(algorithm.getPathfindingAlgorithm());
      default:
        throw new Error(`Invalid command type: ${type}`);
    }
  }
}
