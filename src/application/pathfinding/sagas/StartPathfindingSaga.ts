import {
  PathfindingRunnerCommand,
  PlayPathfindingCommand,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";

export class StartPathfindingSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [PlayPathfindingCommand.type];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerCommandHandler(eventName, this.run);
    });
  }

  public static register(mediator: Mediator): StartPathfindingSaga {
    return new StartPathfindingSaga(mediator);
  }

  private run = ({ payload }: PlayPathfindingCommand) => {
    console.log("StartPathfindingSaga", payload);
    this.mediator.sendCommand(new PathfindingRunnerCommand(payload.algorithm));
  };
}
