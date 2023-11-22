import {
  PauseCommandHandler,
  PlayCommandHandler,
  ResumeCommandHandler,
  StopCommandHandler,
} from "@app/animation";
import {
  PauseMazeCommand,
  PlayMazeCommand,
  ResumeMazeCommand,
  StopMazeCommand,
} from "@domain/maze";
import { Mediator } from "@infra/mediator";
import { PlaybackStore } from "@infra/stores";

export class MazeAnimationSaga {
  private constructor(
    private readonly mediator: Mediator,
    private readonly store: PlaybackStore
  ) {
    const commandHandlers = [
      { command: PlayMazeCommand.type, handler: PlayCommandHandler },
      { command: PauseMazeCommand.type, handler: PauseCommandHandler },
      { command: StopMazeCommand.type, handler: StopCommandHandler },
      { command: ResumeMazeCommand.type, handler: ResumeCommandHandler },
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
