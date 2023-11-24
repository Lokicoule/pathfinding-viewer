import { UnlockEnvironmentCommand } from "@/domain/environment";
import { EnvironmentStore } from "@/infrastructure/stores/EnvironmentStore";
import { MazeAnimationCompletedEvent } from "@domain/maze";
import { PathfindingAnimationCompletedEvent } from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";
import { UnlockEnvironmentCommandHandler } from "../command-handlers/UnlockEnvironmentCommandHandler";

export class UnlockEnvironmentSaga {
  private constructor(private readonly mediator: Mediator) {
    const runsOn = [
      MazeAnimationCompletedEvent.type,
      PathfindingAnimationCompletedEvent.type,
    ];

    runsOn.forEach((eventName: string) => {
      this.mediator.registerEventHandler(eventName, this.run);
    });
  }

  public static register(
    mediator: Mediator,
    environmentStore: EnvironmentStore
  ): UnlockEnvironmentSaga {
    mediator.registerCommandHandler(
      UnlockEnvironmentCommand.type,
      new UnlockEnvironmentCommandHandler(mediator, environmentStore)
    );
    return new UnlockEnvironmentSaga(mediator);
  }

  private run = () => {
    this.mediator.sendCommand(new UnlockEnvironmentCommand());
  };
}
