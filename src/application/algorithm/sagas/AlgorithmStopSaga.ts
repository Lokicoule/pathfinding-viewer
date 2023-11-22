import { StopAlgorithmCommand } from "@domain/algorithm";
import { MazeAnimationCompletedEvent } from "@domain/maze";
import { PathfindingAnimationCompletedEvent } from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

export class AlgorithmStopSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [
      MazeAnimationCompletedEvent.type,
      PathfindingAnimationCompletedEvent.type,
    ];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): AlgorithmStopSaga {
    return new AlgorithmStopSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(new StopAlgorithmCommand());
  };
}
