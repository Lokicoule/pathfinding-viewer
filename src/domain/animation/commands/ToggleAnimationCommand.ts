import { CommandBase } from "@/infrastructure/mediator";

export class ToggleAnimationCommand extends CommandBase {
  public static readonly type = "ToggleAnimationCommand";

  constructor() {
    super(ToggleAnimationCommand.type);
  }
}
