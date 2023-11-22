import { Command } from "../../interfaces/Command";
import { AlgorithmType } from "../types/AlgorithmType";

export class SetAlgorithmCommand extends Command {
  public static readonly type = "SetAlgorithmCommand";

  constructor(public readonly algorithm: AlgorithmType) {
    super(SetAlgorithmCommand.type);
  }
}
