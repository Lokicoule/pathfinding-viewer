import { AddWallCommandHandler } from "../application/command-handlers/AddWallCommandHandler";
import { InitializeGridCommandHandler } from "../application/command-handlers/InitializeGridCommandHandler";
import { AddWallCommand } from "../domain/commands/AddWallCommand";
import { InitializeGridCommand } from "../domain/commands/InitializeGridCommand";
import { Mediator } from "../infrastructure/mediator/Mediator";
import { GridStore } from "../infrastructure/stores/GridStore";

export class CompositionRoot {
  private constructor(
    public readonly mediator: Mediator,
    public readonly gridStore: GridStore
  ) {
    this.initialize();
  }

  public static create(numCols: number, numRows: number) {
    const mediator = new Mediator();
    const gridStore = new GridStore(numCols, numRows);

    return new CompositionRoot(mediator, gridStore);
  }

  public initialize() {
    this.mediator.registerCommandHandler(
      InitializeGridCommand.name,
      new InitializeGridCommandHandler()
    );
    this.mediator.registerCommandHandler(
      AddWallCommand.name,
      new AddWallCommandHandler(this.mediator, this.gridStore)
    );
  }
}
