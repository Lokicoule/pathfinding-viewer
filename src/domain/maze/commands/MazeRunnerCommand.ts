import { CommandBaseWithPayload } from "@/infrastructure/mediator";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";

type PlayMazeCommandPayload = {
  algorithm: MazeAlgorithmType;
};
export class MazeRunnerCommand extends CommandBaseWithPayload<PlayMazeCommandPayload> {
  public static readonly type = "MazeRunnerCommand";

  constructor(algorithm: MazeAlgorithmType) {
    super(MazeRunnerCommand.type, { algorithm });
  }
}
