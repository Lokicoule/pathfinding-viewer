import { PauseMazeCommand } from "../commands/maze/PauseMazeCommand";
import { PlayMazeCommand } from "../commands/maze/PlayMazeCommand";
import { ResumeMazeCommand } from "../commands/maze/ResumeMazeCommand";
import { StopMazeCommand } from "../commands/maze/StopMazeCommand";
import { PausePathfindingCommand } from "../commands/pathfinding/PausePathfindingCommand";
import { PlayPathfindingCommand } from "../commands/pathfinding/PlayPathfindingCommand";
import { ResumePathfindingCommand } from "../commands/pathfinding/ResumePathfindingCommand";
import { StopPathfindingCommand } from "../commands/pathfinding/StopPathfindingCommand";
import { Command } from "../interfaces/Command";
import { Algorithm } from "../valueObjects/Algorithm";

type CommandTypes = "pause" | "resume" | "play" | "stop";

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
      case "stop":
        return algorithm.isMazeAlgorithm()
          ? new StopMazeCommand()
          : new StopPathfindingCommand();
      default:
        throw new Error(`Invalid command type: ${type}`);
    }
  }
}
