import { Mediator } from "../../../infrastructure/mediator/Mediator";
import { PlayPathfindingCommand } from "../../../domain/commands/pathfinding/PlayPathfindingCommand";
import { PausePathfindingCommand } from "../../../domain/commands/pathfinding/PausePathfindingCommand";
import { StopPathfindingCommand } from "../../../domain/commands/pathfinding/StopPathfindingCommand";
import { ResumePathfindingCommand } from "../../../domain/commands/pathfinding/ResumePathfindingCommand";
import { PlayCommandHandler } from "../../playback/command-handlers/PlayCommandHandler";
import { PauseCommandHandler } from "../../playback/command-handlers/PauseCommandHandler";
import { StopCommandHandler } from "../../playback/command-handlers/StopCommandHandler";
import { ResumeCommandHandler } from "../../playback/command-handlers/ResumeCommandHandler";
import { PlaybackStore } from "../../../infrastructure/stores/PlaybackStore";

export class PlaybackPathfindingSaga {
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
  ): PlaybackPathfindingSaga {
    return new PlaybackPathfindingSaga(mediator, store);
  }
}
