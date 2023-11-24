import { CommandBaseWithPayload } from "@/infrastructure/mediator";
import { Node } from "@domain/environment";

type MazeAnimationCommandPayload = {
  nodes: Node[];
};
export class MazeAnimationCommand extends CommandBaseWithPayload<MazeAnimationCommandPayload> {
  public static readonly type = "MazeAnimationCommand";

  constructor(nodes: Node[]) {
    super(MazeAnimationCommand.type, { nodes });
  }
}
