import { Mediator } from "@infra/mediator";
import { PlayPathfindingCommand } from "@domain/commands/pathfinding/PlayPathfindingCommand";
import { PausePathfindingCommand } from "@domain/commands/pathfinding/PausePathfindingCommand";
import { StopPathfindingCommand } from "@domain/commands/pathfinding/StopPathfindingCommand";
import { ResumePathfindingCommand } from "@domain/commands/pathfinding/ResumePathfindingCommand";
import { PlayCommandHandler } from "../../animation/command-handlers/PlayCommandHandler";
import { PauseCommandHandler } from "../../animation/command-handlers/PauseCommandHandler";
import { StopCommandHandler } from "../../animation/command-handlers/StopCommandHandler";
import { ResumeCommandHandler } from "../../animation/command-handlers/ResumeCommandHandler";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class PathfindingAnimationSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly store: PlaybackStore
  ) {
    const commandHandlers = [
      { command: PlayPathfindingCommand.name, handler: PlayCommandHandler },
      { command: PausePathfindingCommand.name, handler: PauseCommandHandler },
      { command: StopPathfindingCommand.name, handler: StopCommandHandler },
      { command: ResumePathfindingCommand.name, handler: ResumeCommandHandler },
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
