import { CommandBaseWithPayload } from "@/infrastructure/mediator";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";

type PlayMazeCommandPayload = {
  algorithm: MazeAlgorithmType;
};
export class PlayMazeCommand extends CommandBaseWithPayload<PlayMazeCommandPayload> {
  public static readonly type = "PlayMazeCommand";

  constructor(algorithm: MazeAlgorithmType) {
    super(PlayMazeCommand.type, { algorithm });
  }
}
