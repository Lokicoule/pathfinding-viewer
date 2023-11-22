import { MazeAnimationCompletedEvent, StopMazeCommand } from "@domain/maze";
import { Mediator } from "@infra/mediator";

export class StopMazeSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [MazeAnimationCompletedEvent.type];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): StopMazeSaga {
    return new StopMazeSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(new StopMazeCommand());
  };
}
