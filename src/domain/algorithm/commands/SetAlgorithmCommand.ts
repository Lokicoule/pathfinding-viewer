import { BaseCommand } from "@/infrastructure/mediator/command/contracts/Command";
import { AlgorithmType } from "../types/AlgorithmType";

export class SetAlgorithmCommand extends BaseCommand {
  public static readonly commandName = "command:set-algorithm";

  constructor(public readonly algorithm: AlgorithmType) {
    super();
  }
}
