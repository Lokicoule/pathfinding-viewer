import { AddWallCommandHandler } from "../application/command-handlers/AddWallCommandHandler";
import { AnimateShortestPathCommandHandler } from "../application/command-handlers/AnimateShortestPathCommandHandler";
import { BreadthFirstSearchCommandHandler } from "../application/command-handlers/BreadthFirstSearchCommandHandler";
import { RemoveWallCommandHandler } from "../application/command-handlers/RemoveWallCommandHandler";
import { ResetGridCommandHandler } from "../application/command-handlers/ResetGridCommandHandler";
import { SetEndNodeCommandHandler } from "../application/command-handlers/SetEndNodeCommandHandler";
import { SetStartNodeCommandHandler } from "../application/command-handlers/SetStartNodeCommandHandler";
import { SwapStartAndEndNodesCommandHandler } from "../application/command-handlers/SwapStartAndEndNodesCommandHandler";
import { NodeInteractionCommandHandler } from "../application/command-handlers/nodeInteractionCommandHandler/NodeInteractionCommandHandler";
import { Mediator } from "../application/mediator/Mediator";
import { AlgorithmExecutionCompletedSaga } from "../application/sagas/AlgorithmExecutionCompletedSaga";
import { ExperienceStore } from "../application/stores/ExperienceStore";
import { GridStore } from "../application/stores/GridStore";
import { AddWallCommand } from "../domain/commands/AddWallCommand";
import { AnimateShortestPathCommand } from "../domain/commands/AnimateShortestPathCommand";
import { BreadthFirstSearchCommand } from "../domain/commands/BreadthFirstSearchCommand";
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
    AlgorithmExecutionCompletedSaga.register(this.mediator);

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
      BreadthFirstSearchCommand.name,
      new BreadthFirstSearchCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      AnimateShortestPathCommand.name,
      new AnimateShortestPathCommandHandler(
        this.mediator,
        this.stores.gridStore
      )
    );
  }
}
