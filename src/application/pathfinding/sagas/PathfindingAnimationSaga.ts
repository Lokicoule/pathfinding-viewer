import {
  PauseCommandHandler,
  PlayCommandHandler,
  ResumeCommandHandler,
  StopCommandHandler,
} from "@app/animation";
import {
  PausePathfindingCommand,
  PlayPathfindingCommand,
  ResumePathfindingCommand,
  StopPathfindingCommand,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";
import { PlaybackStore } from "@infra/stores";

export class PathfindingAnimationSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly store: PlaybackStore
  ) {
    const commandHandlers = [
      { command: PlayPathfindingCommand.type, handler: PlayCommandHandler },
      { command: PausePathfindingCommand.type, handler: PauseCommandHandler },
      { command: StopPathfindingCommand.type, handler: StopCommandHandler },
      { command: ResumePathfindingCommand.type, handler: ResumeCommandHandler },
    ];

    commandHandlers.forEach(({ command, handler }) => {
      this.mediator.registerCommandHandler(command, new handler(this.store));
    });
  }

  public static register(
    mediator: Mediator,
    store: PlaybackStore
  ): PathfindingAnimationSaga {
    return new PathfindingAnimationSaga(mediator, store);
  }
}
