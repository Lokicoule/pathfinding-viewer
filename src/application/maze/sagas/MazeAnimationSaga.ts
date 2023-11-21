import {
  PauseCommandHandler,
  PlayCommandHandler,
  ResumeCommandHandler,
  StopCommandHandler,
} from "@app/animation/command-handlers/";
import { PauseMazeCommand } from "@domain/commands/maze/PauseMazeCommand";
import { PlayMazeCommand } from "@domain/commands/maze/PlayMazeCommand";
import { ResumeMazeCommand } from "@domain/commands/maze/ResumeMazeCommand";
import { StopMazeCommand } from "@domain/commands/maze/StopMazeCommand";
import { Mediator } from "@infra/mediator";
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
