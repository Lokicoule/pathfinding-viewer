import { Mediator } from "@infra/mediator";
import { PlayMazeCommand } from "@domain/commands/maze/PlayMazeCommand";
import { PauseMazeCommand } from "@domain/commands/maze/PauseMazeCommand";
import { StopMazeCommand } from "@domain/commands/maze/StopMazeCommand";
import { ResumeMazeCommand } from "@domain/commands/maze/ResumeMazeCommand";
import { PlayCommandHandler } from "../../playback/command-handlers/PlayCommandHandler";
import { PauseCommandHandler } from "../../playback/command-handlers/PauseCommandHandler";
import { StopCommandHandler } from "../../playback/command-handlers/StopCommandHandler";
import { ResumeCommandHandler } from "../../playback/command-handlers/ResumeCommandHandler";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class MazeAnimationSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly store: PlaybackStore
  ) {
    const commandHandlers = [
      { command: PlayMazeCommand.name, handler: PlayCommandHandler },
      { command: PauseMazeCommand.name, handler: PauseCommandHandler },
      { command: StopMazeCommand.name, handler: StopCommandHandler },
      { command: ResumeMazeCommand.name, handler: ResumeCommandHandler },
    ];

    commandHandlers.forEach(({ command, handler }) => {
      this.mediator.registerCommandHandler(command, new handler(this.store));
    });
  }

  public static register(
    mediator: Mediator,
    store: PlaybackStore
  ): MazeAnimationSaga {
    return new MazeAnimationSaga(mediator, store);
  }
}
