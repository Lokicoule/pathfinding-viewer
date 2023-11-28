import { ICommand } from "@/infrastructure/mediator/command/contracts/Command";
import { Algorithm } from "../../algorithm/valueObjects/Algorithm";
import {
  PauseAnimationCommand,
  PlayAnimationCommand,
  ResumeAnimationCommand,
  StopAnimationCommand,
} from "../commands";

type CommandTypes = "pause" | "resume" | "play" | "stop";

export class AnimationCommandBuilder {
  static build(type: CommandTypes, algorithm: Algorithm): ICommand {
    switch (type) {
      case "pause":
        return new PauseAnimationCommand();
      case "resume":
        return new ResumeAnimationCommand();
      case "play":
        return new PlayAnimationCommand(algorithm.value);
      case "stop":
        return new StopAnimationCommand();
      default:
        throw new Error(`Invalid command type: ${type}`);
    }
  }
}
