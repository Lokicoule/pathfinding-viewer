import {
  PathfindingRunnerCommand,
  PlayPathfindingCommand,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

export class StartPathfindingSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [PlayPathfindingCommand.name];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerCommandHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): StartPathfindingSaga {
    return new StartPathfindingSaga(mediator);
  }

  private run = (command: PlayPathfindingCommand) => {
    this.mediator.sendCommand(new PathfindingRunnerCommand(command.algorithm));
  };
}
