import { Algorithm } from "@/domain/algorithm";
import { PlayAnimationCommand } from "@/domain/animation/commands/PlayAnimationCommand";
import { AnimationPlayedEvent } from "@/domain/animation/events";
import { MazeRunnerCommand } from "@/domain/maze";
import { PathfindingRunnerCommand } from "@/domain/pathfinding";
import { Mediator } from "@/infrastructure/mediator";
import { ICommandHandler } from "@/infrastructure/mediator/command/contracts/CommandHandler";

import { AnimationStore } from "@/infrastructure/stores";

export class PlayAnimationCommandHandler
  implements ICommandHandler<PlayAnimationCommand, void>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly animationStore: AnimationStore
  ) {}

  execute(command: PlayAnimationCommand) {
    console.log("PlayAnimationCommandHandler.execute()");

    const algorithm = Algorithm.create(command.algorithm);

    if (algorithm.isMazeAlgorithm()) {
      this.mediator.sendCommand(
        new MazeRunnerCommand(algorithm.getMazeAlgorithm())
      );
    } else {
      this.mediator.sendCommand(
        new PathfindingRunnerCommand(algorithm.getPathfindingAlgorithm())
      );
    }

    this.animationStore.setPlayback("PLAY");

    this.mediator.sendEvent(new AnimationPlayedEvent());
  }
}
