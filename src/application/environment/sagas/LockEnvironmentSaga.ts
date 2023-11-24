import { LockEnvironmentCommand } from "@/domain/environment";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";
import { MazeRunnerCommand } from "@domain/maze";
import { PathfindingRunnerCommand } from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";
import { LockEnvironmentCommandHandler } from "../command-handlers/LockEnvironmentCommandHandler";

export class LockEnvironmentSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [MazeRunnerCommand.type, PathfindingRunnerCommand.type];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerCommandHandler(eventName, this.run);
    });
  }

  public static register(
    mediator: Mediator,
    environmentStore: EnvironmentStore
  ): LockEnvironmentSaga {
    mediator.registerCommandHandler(
      LockEnvironmentCommand.type,
      new LockEnvironmentCommandHandler(mediator, environmentStore)
    );
    return new LockEnvironmentSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(new LockEnvironmentCommand());
  };
}
