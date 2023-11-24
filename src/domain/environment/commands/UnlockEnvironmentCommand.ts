import { CommandBase } from "@/infrastructure/mediator";

export class UnlockEnvironmentCommand extends CommandBase {
  public static readonly type = "UnlockEnvironmentCommand";

  constructor() {
    super(UnlockEnvironmentCommand.type);
  }
}
