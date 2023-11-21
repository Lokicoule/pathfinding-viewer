import {
  PathfindingAnimationCommand,
  PathfindingRunnerCompletedEvent,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

export class PathfindingCompletionSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [PathfindingRunnerCompletedEvent.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): PathfindingCompletionSaga {
    return new PathfindingCompletionSaga(mediator);
  }

  private run = (event: PathfindingRunnerCompletedEvent) => {
    this.mediator.sendCommand(
      new PathfindingAnimationCommand(event.endNode, event.path)
    );
  };
}
