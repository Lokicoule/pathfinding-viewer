import { BaseCommand } from "@infra/cqrs/command/models";
import { MazeAlgorithmType } from "../types/MazeAlgorithmType";

export class MazeRunnerCommand extends BaseCommand {
  public static readonly commandName = "command:maze-runner";

  constructor(public readonly algorithm: MazeAlgorithmType) {
    super();
  }
}
