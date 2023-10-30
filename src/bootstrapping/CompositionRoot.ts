import { AddWallCommandHandler } from "../application/command-handlers/AddWallCommandHandler";
import { RemoveWallCommandHandler } from "../application/command-handlers/RemoveWallCommandHandler";
import { ResetGridCommandHandler } from "../application/command-handlers/ResetGridCommandHandler";
import { SetEndNodeCommandHandler } from "../application/command-handlers/SetEndNodeCommandHandler";
import { SetSelectedNodeTypeCommandHandler } from "../application/command-handlers/SetSelectedNodeTypeCommandHandler";
import { SetStartNodeCommandHandler } from "../application/command-handlers/SetStartNodeCommandHandler";
import { SwapStartAndEndNodesCommandHandler } from "../application/command-handlers/SwapStartAndEndNodesCommandHandler";
import { NodeInteractionCommandHandler } from "../application/command-handlers/nodeInteractionCommandHandler/NodeInteractionCommandHandler";
import { Mediator } from "../application/mediator/Mediator";
import { RestoreToDefaultNodeTypeOnEventSaga } from "../application/sagas/ResetSelectedNodeTypeSaga";
import { ExperienceStore } from "../application/stores/ExperienceStore";
import { GridStore } from "../application/stores/GridStore";
import { AddWallCommand } from "../domain/commands/AddWallCommand";
import { NodeInteractionCommand } from "../domain/commands/NodeInteractionCommand";
import { RemoveWallCommand } from "../domain/commands/RemoveWallCommand";
import { ResetGridCommand } from "../domain/commands/ResetGridCommand";
import { SetEndNodeCommand } from "../domain/commands/SetEndNodeCommand";
import { SetSelectedNodeTypeCommand } from "../domain/commands/SetSelectedNodeTypeCommand";
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
    RestoreToDefaultNodeTypeOnEventSaga.register(this.mediator);

    this.registerMediatorHandlers();
  }

  private registerMediatorHandlers() {
    this.mediator.registerCommandHandler(
      AddWallCommand.name,
      new AddWallCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      RemoveWallCommand.name,
      new RemoveWallCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetStartNodeCommand.name,
      new SetStartNodeCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetEndNodeCommand.name,
      new SetEndNodeCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      ResetGridCommand.name,
      new ResetGridCommandHandler(this.mediator, this.stores.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetSelectedNodeTypeCommand.name,
      new SetSelectedNodeTypeCommandHandler(this.stores.experienceStore)
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
      new SwapStartAndEndNodesCommandHandler(
        this.mediator,
        this.stores.gridStore
      )
    );
  }
}
