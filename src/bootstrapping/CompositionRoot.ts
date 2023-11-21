import { SetAlgorithmCommand } from "@/domain/algorithm/commands";
import {
  AlgorithmStartSaga,
  AlgorithmStopSaga,
  SetAlgorithmCommandHandler,
  StartAlgorithmCommandHandler,
  StopAlgorithmCommandHandler,
} from "@app/algorithm";
import {
  ToggleAnimationCommandHandler,
  UpdateSpeedCommandHandler,
} from "@app/animation";
import { GridInteractionSaga, NodeInteractionSaga } from "@app/environment";
import {
  MazeAnimationCommandHandler,
  MazeAnimationSaga,
  MazeCompletionSaga,
  MazeRunnerCommandHandler,
  StartMazeSaga,
  StopMazeSaga,
} from "@app/maze";
import {
  PathfindingAnimationCommandHandler,
  PathfindingAnimationSaga,
  PathfindingCompletionSaga,
  PathfindingRunnerCommandHandler,
  StartPathfindingSaga,
  StopPathfindingSaga,
} from "@app/pathfinding";
import { StartAlgorithmCommand, StopAlgorithmCommand } from "@domain/algorithm";
import { ToggleAnimationCommand, UpdateSpeedCommand } from "@domain/animation";
import { MazeAnimationCommand, MazeRunnerCommand } from "@domain/maze";
import {
  PathfindingAnimationCommand,
  PathfindingRunnerCommand,
} from "@domain/pathfinding";
import { Mediator } from "@infra/mediator";
import { GlobalState } from "./GlobalState";

export class CompositionRoot {
  private constructor(
    public readonly mediator: Mediator,
    public readonly stores: GlobalState
  ) {
    this.initialize();
  }

  public static create(numCols: number, numRows: number) {
    const mediator = new Mediator();

    return new CompositionRoot(mediator, new GlobalState(numCols, numRows));
  }

  public initialize() {
    StartPathfindingSaga.register(this.mediator);
    StopPathfindingSaga.register(this.mediator);
    PathfindingCompletionSaga.register(this.mediator);
    PathfindingAnimationSaga.register(
      this.mediator,
      this.stores.pathfindingPlaybackStore
    );
    StartMazeSaga.register(this.mediator);
    StopMazeSaga.register(this.mediator);
    MazeCompletionSaga.register(this.mediator);
    MazeAnimationSaga.register(this.mediator, this.stores.mazePlaybackStore);
    AlgorithmStartSaga.register(this.mediator);
    AlgorithmStopSaga.register(this.mediator);
    GridInteractionSaga.register(this.mediator, this.stores);
    NodeInteractionSaga.register(this.mediator, this.stores);
    this.registerMediatorHandlers();
  }

  private registerMediatorHandlers() {
    this.mediator.registerCommandHandler(
      PathfindingRunnerCommand.name,
      new PathfindingRunnerCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      PathfindingAnimationCommand.name,
      new PathfindingAnimationCommandHandler(
        this.mediator,
        this.stores.gridStore,
        this.stores.pathfindingPlaybackStore,
        this.stores.animationStore
      )
    );
    this.mediator.registerCommandHandler(
      MazeAnimationCommand.name,
      new MazeAnimationCommandHandler(
        this.mediator,
        this.stores.gridStore,
        this.stores.mazePlaybackStore,
        this.stores.animationStore
      )
    );
    this.mediator.registerCommandHandler(
      MazeRunnerCommand.name,
      new MazeRunnerCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      StartAlgorithmCommand.name,
      new StartAlgorithmCommandHandler(this.stores.algorithmStore)
    );
    this.mediator.registerCommandHandler(
      StopAlgorithmCommand.name,
      new StopAlgorithmCommandHandler(this.stores.algorithmStore)
    );
    this.mediator.registerCommandHandler(
      UpdateSpeedCommand.name,
      new UpdateSpeedCommandHandler(this.stores.animationStore)
    );
    this.mediator.registerCommandHandler(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommandHandler(this.stores.algorithmStore)
    );
    this.mediator.registerCommandHandler(
      ToggleAnimationCommand.name,
      new ToggleAnimationCommandHandler(this.stores.animationStore)
    );
  }
}
