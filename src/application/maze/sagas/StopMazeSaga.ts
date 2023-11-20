import { StopMazeCommand } from "@domain/commands/maze/StopMazeCommand";
import { MazeAnimationCompletedEvent } from "@domain/events/MazeAnimationCompletedEvent";
import { Mediator } from "@infra/mediator/Mediator";

export class StopMazeSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [MazeAnimationCompletedEvent.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): StopMazeSaga {
    return new StopMazeSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(StopMazeCommand.name, new StopMazeCommand());
  };
}
