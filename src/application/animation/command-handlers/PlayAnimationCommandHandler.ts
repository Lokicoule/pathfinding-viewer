import { Algorithm } from "@domain/algorithm";
import { AnimationPlayedEvent, PlayAnimationCommand } from "@domain/animation";
import { MazeRunnerCommand } from "@domain/maze";
import { PathfindingRunnerCommand } from "@domain/pathfinding";
import { CommandHandlerContract } from "@infra/cqrs";
import { Mediator } from "@infra/mediator";
import { AnimationStore } from "@infra/stores";

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
