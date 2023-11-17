import { SetAlgorithmCommandHandler } from "../application/algorithm/command-handlers/SetAlgorithmCommandHandler";
import { StartAlgorithmCommandHandler } from "../application/algorithm/command-handlers/StartAlgorithmCommandHandler";
import { StopAlgorithmCommandHandler } from "../application/algorithm/command-handlers/StopAlgorithmCommandHandler";
import { AlgorithmStartSaga } from "../application/algorithm/sagas/AlgorithmStartSaga";
import { AlgorithmStopSaga } from "../application/algorithm/sagas/AlgorithmStopSaga";
import { ToggleAnimationCommandHandler } from "../application/animation/command-handlers/ToggleAnimationCommandHandler";
import { UpdateSpeedCommandHandler } from "../application/interaction/command-handlers/UpdateSpeedCommandHandler";
import { GridInteractionSaga } from "../application/interaction/sagas/GridInteractionSaga";
import { MazeAnimationCommandHandler } from "../application/maze/command-handlers/MazeAnimationCommandHandler";
import { MazeRunnerCommandHandler } from "../application/maze/command-handlers/MazeRunnerCommandHandler";
import { MazeCompletionSaga } from "../application/maze/sagas/MazeCompletionSaga";
import { PlaybackMazeSaga } from "../application/maze/sagas/PlaybackMazeSaga";
import { StartMazeSaga } from "../application/maze/sagas/StartMazeSaga";
import { PathfindingAnimationCommandHandler } from "../application/pathfinding/command-handlers/PathfindingAnimationCommandHandler";
import { PathfindingRunnerCommandHandler } from "../application/pathfinding/command-handlers/PathfindingRunnerCommandHandler";
import { PathfindingCompletionSaga } from "../application/pathfinding/sagas/PathfindingCompletionSaga";
import { PlaybackPathfindingSaga } from "../application/pathfinding/sagas/PlaybackPathfindingSaga";
import { StartPathfindingSaga } from "../application/pathfinding/sagas/StartPathfindingSaga";
import { MazeAnimationCommand } from "../domain/commands/MazeAnimationCommand";
import { MazeRunnerCommand } from "../domain/commands/MazeRunnerCommand";
import { PathfindingAnimationCommand } from "../domain/commands/PathfindingAnimationCommand";
import { PathfindingRunnerCommand } from "../domain/commands/PathfindingRunnerCommand";
import { SetAlgorithmCommand } from "../domain/commands/SetAlgorithmCommand";
import { StartAlgorithmCommand } from "../domain/commands/StartAlgorithmCommand";
import { StopAlgorithmCommand } from "../domain/commands/StopAlgorithmCommand";
import { UpdateSpeedCommand } from "../domain/commands/UpdateSpeedCommand";
import { ToggleAnimationCommand } from "../domain/commands/animation/ToggleAnimation";
import { Mediator } from "../infrastructure/mediator/Mediator";
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
    PathfindingCompletionSaga.register(this.mediator);
    PlaybackPathfindingSaga.register(
      this.mediator,
      this.stores.pathfindingPlaybackStore
    );
    StartMazeSaga.register(this.mediator);
    MazeCompletionSaga.register(this.mediator);
    PlaybackMazeSaga.register(this.mediator, this.stores.mazePlaybackStore);
    AlgorithmStartSaga.register(this.mediator);
    AlgorithmStopSaga.register(this.mediator);
    GridInteractionSaga.register(this.mediator, this.stores);

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
