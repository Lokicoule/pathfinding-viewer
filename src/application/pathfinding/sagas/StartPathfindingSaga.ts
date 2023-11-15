import { PathfindingRunnerCommand } from "../../../domain/commands/PathfindingRunnerCommand";
import { PlayPathfindingCommand } from "../../../domain/commands/pathfinding/PlayPathfindingCommand";
import { Mediator } from "../../../infrastructure/mediator/Mediator";

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
    this.mediator.sendCommand(
      PathfindingRunnerCommand.name,
      new PathfindingRunnerCommand(command.algorithm)
    );
  };
}
