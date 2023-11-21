import { Command } from "../../interfaces/Command";
import { AlgorithmType } from "../types/AlgorithmType";

export class SetAlgorithmCommand extends Command {
  constructor(public readonly algorithm: AlgorithmType) {
    super("SetAlgorithmCommand");
  }
}
