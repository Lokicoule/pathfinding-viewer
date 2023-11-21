import { MazeRunnerCommand } from "@domain/commands/maze/MazeRunnerCommand";
import { PlayMazeCommand } from "@domain/commands/maze/PlayMazeCommand";
import { Mediator } from "@infra/mediator";

export class StartMazeSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [PlayMazeCommand.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerCommandHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): StartMazeSaga {
    return new StartMazeSaga(mediator);
  }

  private run = (command: PlayMazeCommand) => {
    this.mediator.sendCommand(new MazeRunnerCommand(command.algorithm));
  };
}
