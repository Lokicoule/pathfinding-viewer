import { StartAlgorithmCommandHandler } from "../application/algorithm/command-handlers/StartAlgorithmCommandHandler";
import { StopAlgorithmCommandHandler } from "../application/algorithm/command-handlers/StopAlgorithmCommandHandler";
import { AlgorithmStartSaga } from "../application/algorithm/sagas/AlgorithmStartSaga";
import { AlgorithmStopSaga } from "../application/algorithm/sagas/AlgorithmStopSaga";
import { ClearPathAndExploredNodesCommandHandler } from "../application/interaction/command-handlers/ClearPathAndExploredNodesCommandHandler";
import { ClearWallsCommandHandler } from "../application/interaction/command-handlers/ClearWallsCommandHandler";
import { NodeInteractionCommandHandler } from "../application/interaction/command-handlers/NodeInteractionCommandHandler";
import { ResetGridCommandHandler } from "../application/interaction/command-handlers/ResetGridCommandHandler";
import { UpdateSpeedCommandHandler } from "../application/interaction/command-handlers/UpdateSpeedCommandHandler";
import { MazeAnimationCommandHandler } from "../application/maze/command-handlers/MazeAnimationCommandHandler";
import { MazeRunnerCommandHandler } from "../application/maze/command-handlers/MazeRunnerCommandHandler";
import { MazeCompletionSaga } from "../application/maze/sagas/MazeCompletionSaga";
import { PathfindingAnimationCommandHandler } from "../application/pathfinding/command-handlers/PathfindingAnimationCommandHandler";
import { PathfindingRunnerCommandHandler } from "../application/pathfinding/command-handlers/PathfindingRunnerCommandHandler";
import { PathfindingCompletionSaga } from "../application/pathfinding/sagas/PathfindingCompletionSaga";
import { ClearPathAndExploredNodesCommand } from "../domain/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "../domain/commands/ClearWallsCommand";
import { MazeAnimationCommand } from "../domain/commands/MazeAnimationCommand";
import { MazeRunnerCommand } from "../domain/commands/MazeRunnerCommand";
import { NodeInteractionCommand } from "../domain/commands/NodeInteractionCommand";
import { PathfindingAnimationCommand } from "../domain/commands/PathfindingAnimationCommand";
import { PathfindingRunnerCommand } from "../domain/commands/PathfindingRunnerCommand";
import { ResetGridCommand } from "../domain/commands/ResetGridCommand";
import { StartAlgorithmCommand } from "../domain/commands/StartAlgorithmCommand";
import { StopAlgorithmCommand } from "../domain/commands/StopAlgorithmCommand";
import { UpdateSpeedCommand } from "../domain/commands/UpdateSpeedCommand";
import { Mediator } from "../infrastructure/mediator/Mediator";
import { ExperienceStore } from "../infrastructure/stores/ExperienceStore";
import { GridStore } from "../infrastructure/stores/GridStore";

class Stores {
  public readonly gridStore: GridStore;
  public readonly experienceStore: ExperienceStore;

  constructor(numCols: number, numRows: number) {
    this.gridStore = new GridStore(numCols, numRows);
    this.experienceStore = new ExperienceStore();
  }
}

export class CompositionRoot {
  private constructor(
    public readonly mediator: Mediator,
    public readonly stores: Stores
  ) {
    this.initialize();
  }

  public static create(numCols: number, numRows: number) {
    const mediator = new Mediator();

    return new CompositionRoot(mediator, new Stores(numCols, numRows));
  }

  public initialize() {
    PathfindingCompletionSaga.register(this.mediator);
    MazeCompletionSaga.register(this.mediator);
    AlgorithmStartSaga.register(this.mediator);
    AlgorithmStopSaga.register(this.mediator);

    this.registerMediatorHandlers();
  }

  private registerMediatorHandlers() {
    this.mediator.registerCommandHandler(
      NodeInteractionCommand.name,
      new NodeInteractionCommandHandler(
        this.stores.experienceStore,
        this.stores.gridStore
      )
    );
    this.mediator.registerCommandHandler(
      ResetGridCommand.name,
      new ResetGridCommandHandler(
        this.stores.experienceStore,
        this.stores.gridStore
      )
    );
    this.mediator.registerCommandHandler(
      ClearWallsCommand.name,
      new ClearWallsCommandHandler(
        this.stores.experienceStore,
        this.stores.gridStore
      )
    );
    this.mediator.registerCommandHandler(
      ClearPathAndExploredNodesCommand.name,
      new ClearPathAndExploredNodesCommandHandler(
        this.stores.experienceStore,
        this.stores.gridStore
      )
    );
    this.mediator.registerCommandHandler(
      PathfindingRunnerCommand.name,
      new PathfindingRunnerCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      PathfindingAnimationCommand.name,
      new PathfindingAnimationCommandHandler(
        this.mediator,
        this.stores.experienceStore,
        this.stores.gridStore
      )
    );
    this.mediator.registerCommandHandler(
      MazeAnimationCommand.name,
      new MazeAnimationCommandHandler(
        this.mediator,
        this.stores.experienceStore,
        this.stores.gridStore
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
  }
}
