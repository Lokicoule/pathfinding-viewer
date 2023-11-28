import { Algorithm } from "@/domain/algorithm";
import { PlayAnimationCommand } from "@/domain/animation/commands/PlayAnimationCommand";
import { AnimationPlayedEvent } from "@/domain/animation/events";
import { MazeRunnerCommand } from "@/domain/maze";
import { PathfindingRunnerCommand } from "@/domain/pathfinding";
import { Mediator } from "@/infrastructure/mediator";
import { CommandHandlerContract } from "@/infrastructure/cqrs/command/contracts/CommandHandlerContract";

import { AnimationStore } from "@/infrastructure/stores";

export class PlayAnimationCommandHandler
  implements CommandHandlerContract<PlayAnimationCommand, void>
{
  constructor(
    private readonly mediator: Mediator,
    private readonly animationStore: AnimationStore
  ) {}

  execute(command: PlayAnimationCommand) {
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
