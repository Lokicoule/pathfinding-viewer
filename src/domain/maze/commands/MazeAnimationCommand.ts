import { Node } from "@domain/environment";
import { Command } from "../../interfaces/Command";

export class MazeAnimationCommand extends Command {
  public static readonly type = "MazeAnimationCommand";

  constructor(public readonly wallsInOrder: Node[]) {
    super(MazeAnimationCommand.type);
  }
}
