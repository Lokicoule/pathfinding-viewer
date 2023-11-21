import {
  PathfindingAnimationCompletedEvent,
  StopPathfindingCommand,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

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
    this.mediator.sendCommand(new StopPathfindingCommand());
  };
}
