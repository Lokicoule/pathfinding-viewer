import { AddWallCommandHandler } from "../application/command-handlers/AddWallCommandHandler";
import { AlgorithmAnimationCommandHandler } from "../application/command-handlers/AlgorithmAnimationCommandHandler";
import { AlgorithmRunnerCommandHandler } from "../application/command-handlers/AlgorithmRunnerCommandHandler";
import { MazeAlgorithmAnimationCommandHandler } from "../application/command-handlers/MazeAlgorithmAnimationCommandHandler";
import { MazeGenerationRunnerCommandHandler } from "../application/command-handlers/MazeGenerationRunnerCommandHandler";
import { RemoveWallCommandHandler } from "../application/command-handlers/RemoveWallCommandHandler";
import { ResetGridCommandHandler } from "../application/command-handlers/ResetGridCommandHandler";
import { SetEndNodeCommandHandler } from "../application/command-handlers/SetEndNodeCommandHandler";
import { SetStartNodeCommandHandler } from "../application/command-handlers/SetStartNodeCommandHandler";
import { SwapStartAndEndNodesCommandHandler } from "../application/command-handlers/SwapStartAndEndNodesCommandHandler";
import { NodeInteractionCommandHandler } from "../application/command-handlers/nodeInteractionCommandHandler/NodeInteractionCommandHandler";
import { Mediator } from "../application/mediator/Mediator";
import { AlgorithmCompletionSaga } from "../application/sagas/AlgorithmCompletionSaga";
import { ExperienceStore } from "../application/stores/ExperienceStore";
import { GridStore } from "../application/stores/GridStore";
import { AddWallCommand } from "../domain/commands/AddWallCommand";
import { AlgorithmAnimationCommand } from "../domain/commands/AlgorithmAnimationCommand";
import { AlgorithmRunnerCommand } from "../domain/commands/AlgorithmRunnerCommand";
import { MazeAlgorithmAnimationCommand } from "../domain/commands/MazeAlgorithmAnimationCommand";
import { MazeGenerationRunnerCommand } from "../domain/commands/MazeGenerationRunnerCommand";
import { NodeInteractionCommand } from "../domain/commands/NodeInteractionCommand";
import { RemoveWallCommand } from "../domain/commands/RemoveWallCommand";
import { ResetGridCommand } from "../domain/commands/ResetGridCommand";
import { SetEndNodeCommand } from "../domain/commands/SetEndNodeCommand";
import { SetStartNodeCommand } from "../domain/commands/SetStartNodeCommand";
import { SwapStartAndEndNodesCommand } from "../domain/commands/SwapStartAndEndNodesCommand";

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
    AlgorithmCompletionSaga.register(this.mediator);

    this.registerMediatorHandlers();
  }

  private registerMediatorHandlers() {
    this.mediator.registerCommandHandler(
      AddWallCommand.name,
      new AddWallCommandHandler(this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      RemoveWallCommand.name,
      new RemoveWallCommandHandler(this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetStartNodeCommand.name,
      new SetStartNodeCommandHandler(this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetEndNodeCommand.name,
      new SetEndNodeCommandHandler(this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      ResetGridCommand.name,
      new ResetGridCommandHandler(this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      NodeInteractionCommand.name,
      new NodeInteractionCommandHandler(
        this.mediator,
        this.stores.experienceStore
      )
    );
    this.mediator.registerCommandHandler(
      SwapStartAndEndNodesCommand.name,
      new SwapStartAndEndNodesCommandHandler(this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      AlgorithmRunnerCommand.name,
      new AlgorithmRunnerCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      AlgorithmAnimationCommand.name,
      new AlgorithmAnimationCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      MazeAlgorithmAnimationCommand.name,
      new MazeAlgorithmAnimationCommandHandler(
        this.mediator,
        this.stores.gridStore
      )
    );
    this.mediator.registerCommandHandler(
      MazeGenerationRunnerCommand.name,
      new MazeGenerationRunnerCommandHandler(
        this.mediator,
        this.stores.gridStore
      )
    );
  }
}
