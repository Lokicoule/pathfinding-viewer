import {
  PauseMazeCommand,
  PlayMazeCommand,
  ResumeMazeCommand,
  StopMazeCommand,
} from "@domain/maze";
import {
  PausePathfindingCommand,
  PlayPathfindingCommand,
  ResumePathfindingCommand,
  StopPathfindingCommand,
} from "@domain/pathfinding";
import { Algorithm } from "../../algorithm/valueObjects/Algorithm";
import { Command } from "@/infrastructure/mediator";

type CommandTypes = "pause" | "resume" | "play" | "stop";

export class AnimationCommandBuilder {
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
