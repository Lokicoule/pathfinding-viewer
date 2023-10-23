import { Command } from "../interfaces/Command";

export class RenderCommand extends Command {
  public override readonly type = RenderCommand.name;
}
