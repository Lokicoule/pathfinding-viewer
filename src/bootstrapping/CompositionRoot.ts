import { UpdateSpeedCommandHandler } from "@/application/animation";
import { MazeAnimationSaga } from "@/application/maze";
import { StopPathfindingSaga } from "@/application/pathfinding";
import {
  AlgorithmStartSaga,
  AlgorithmStopSaga,
  SetAlgorithmCommandHandler,
  StartAlgorithmCommandHandler,
  StopAlgorithmCommandHandler,
} from "@app/algorithm";
import { ToggleAnimationCommandHandler } from "@app/animation";
import { GridInteractionSaga } from "@app/interaction";
import {
  MazeAnimationCommandHandler,
  MazeCompletionSaga,
  MazeRunnerCommandHandler,
  StartMazeSaga,
  StopMazeSaga,
} from "@app/maze";
import {
  PathfindingAnimationCommandHandler,
  PathfindingCompletionSaga,
  PathfindingRunnerCommandHandler,
  PlaybackPathfindingSaga,
  StartPathfindingSaga,
} from "@app/pathfinding";
import { MazeAnimationCommand } from "@domain/commands/MazeAnimationCommand";
import { MazeRunnerCommand } from "@domain/commands/MazeRunnerCommand";
import { PathfindingAnimationCommand } from "@domain/commands/PathfindingAnimationCommand";
import { PathfindingRunnerCommand } from "@domain/commands/PathfindingRunnerCommand";
import { SetAlgorithmCommand } from "@domain/commands/SetAlgorithmCommand";
import { StartAlgorithmCommand } from "@domain/commands/StartAlgorithmCommand";
import { StopAlgorithmCommand } from "@domain/commands/StopAlgorithmCommand";
import { UpdateSpeedCommand } from "@domain/commands/UpdateSpeedCommand";
import { ToggleAnimationCommand } from "@domain/commands/animation/ToggleAnimation";
import { Mediator } from "@infra/mediator";
import { GlobalState } from "./GlobalState";
import { NodeInteractionSaga } from "@/application/environment/sagas/NodeInteractionSaga";

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
    PlaybackPathfindingSaga.register(
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
        this.stores.experienceStore,
        this.stores.gridStore,
        this.stores.pathfindingPlaybackStore,
        this.stores.animationStore
      )
    );
    this.mediator.registerCommandHandler(
      MazeAnimationCommand.name,
      new MazeAnimationCommandHandler(
        this.mediator,
        this.stores.experienceStore,
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
      new StartAlgorithmCommandHandler(this.stores.experienceStore)
    );
    this.mediator.registerCommandHandler(
      StopAlgorithmCommand.name,
      new StopAlgorithmCommandHandler(this.stores.experienceStore)
    );
    this.mediator.registerCommandHandler(
      UpdateSpeedCommand.name,
      new UpdateSpeedCommandHandler(this.stores.experienceStore)
    );
    this.mediator.registerCommandHandler(
      SetAlgorithmCommand.name,
      new SetAlgorithmCommandHandler(this.stores.experienceStore)
    );
    this.mediator.registerCommandHandler(
      ToggleAnimationCommand.name,
      new ToggleAnimationCommandHandler(this.stores.animationStore)
    );
  }
}
