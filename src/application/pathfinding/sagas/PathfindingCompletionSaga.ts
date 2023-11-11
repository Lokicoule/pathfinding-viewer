import { PathfindingAnimationCommand } from "../../../domain/commands/PathfindingAnimationCommand";
import { PathfindingRunnerCompletedEvent } from "../../../domain/events/PathfindingRunnerCompletedEvent";
import { Mediator } from "../../../infrastructure/mediator/Mediator";

export class PathfindingCompletionSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOnSolver = [PathfindingRunnerCompletedEvent.name];

    runsOnSolver.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): PathfindingCompletionSaga {
    return new PathfindingCompletionSaga(mediator);
  }

  private run = (event: PathfindingRunnerCompletedEvent) => {
    this.mediator.sendCommand(
      PathfindingAnimationCommand.name,
      new PathfindingAnimationCommand(event.endNode, event.path)
    );
  };
}
