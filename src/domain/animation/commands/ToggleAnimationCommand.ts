import { Command } from "../../interfaces/Command";

export class ToggleAnimationCommand extends Command {
  public static readonly type = "ToggleAnimationCommand";

  constructor() {
    super(ToggleAnimationCommand.type);
  }
}
