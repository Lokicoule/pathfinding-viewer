import { Command } from "../interfaces/Command";
import { AlgorithmType } from "../types/AlgorithmType";

export class AlgorithmRunnerCommand extends Command {
  constructor(public readonly algorithm: AlgorithmType) {
    super("AlgorithmRunnerCommand");
  }
}
