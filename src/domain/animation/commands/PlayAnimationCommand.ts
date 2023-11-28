import { BaseCommand } from "@/infrastructure/mediator";
import { AlgorithmType } from "@domain/algorithm";

export class PlayAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:play-animation";

  constructor(public readonly algorithm: AlgorithmType) {
    super();
  }
}
