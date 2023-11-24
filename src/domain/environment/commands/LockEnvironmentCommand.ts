import { CommandBase } from "@/infrastructure/mediator";

export class LockEnvironmentCommand extends CommandBase {
  public static readonly type = "LockEnvironmentCommand";

  constructor() {
    super(LockEnvironmentCommand.type);
  }
}
