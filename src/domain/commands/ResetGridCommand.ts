import { Command } from "../interfaces/Command";

export class ResetGridCommand implements Command {
  public readonly type = ResetGridCommand.name;
}
