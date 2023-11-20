import { StopAlgorithmCommand } from "@domain/commands/StopAlgorithmCommand";
import { MazeAnimationCompletedEvent } from "@domain/events/MazeAnimationCompletedEvent";
import { PathfindingAnimationCompletedEvent } from "@domain/events/PathfindingAnimationCompletedEvent";
import { Mediator } from "@infra/mediator";

export class AlgorithmStopSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [
      MazeAnimationCompletedEvent.name,
      PathfindingAnimationCompletedEvent.name,
    ];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): AlgorithmStopSaga {
    return new AlgorithmStopSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(
      StopAlgorithmCommand.name,
      new StopAlgorithmCommand()
    );
  };
}
