import { StopPathfindingCommand } from "../../../domain/commands/pathfinding/StopPathfindingCommand";
import { PathfindingAnimationCompletedEvent } from "../../../domain/events/PathfindingAnimationCompletedEvent";
import { Mediator } from "../../../infrastructure/mediator/Mediator";

export class StopPathfindingSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [PathfindingAnimationCompletedEvent.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): StopPathfindingSaga {
    return new StopPathfindingSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(
      StopPathfindingCommand.name,
      new StopPathfindingCommand()
    );
  };
}
