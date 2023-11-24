import { CommandBase } from "@/infrastructure/mediator";

export class ResetGridCommand extends CommandBase {
  public static readonly type = "ResetGridCommand";

  constructor() {
    super(ResetGridCommand.type);
  }
}
