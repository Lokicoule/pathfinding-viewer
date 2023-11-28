import { BaseCommand } from "@/infrastructure/mediator";
import { Node } from "@domain/environment";

export class MazeAnimationCommand extends BaseCommand {
  public static readonly commandName = "command:maze-animation";

  constructor(public readonly nodes: Node[]) {
    super();
  }
}
