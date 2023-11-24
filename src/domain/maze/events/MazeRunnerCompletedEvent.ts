import { EventBaseWithPayload } from "@/infrastructure/mediator";
import { Node } from "../../environment/entities/Node";

type MazeRunnerCompletedEventPayload = {
  path: Node[];
};
export class MazeRunnerCompletedEvent extends EventBaseWithPayload<MazeRunnerCompletedEventPayload> {
  public static readonly type = "MazeRunnerCompletedEvent";

  constructor(public readonly path: Node[]) {
    super(MazeRunnerCompletedEvent.type, { path });
  }
}
