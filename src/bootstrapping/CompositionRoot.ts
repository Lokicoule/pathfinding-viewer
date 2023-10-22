import { AddWallCommandHandler } from "../application/command-handlers/AddWallCommandHandler";
import { SetStartNodeCommandHandler } from "../application/command-handlers/SetStartNodeCommandHandler";
import { AddWallCommand } from "../domain/commands/AddWallCommand";
import { SetStartNodeCommand } from "../domain/commands/SetStartNodeCommand";
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
      AddWallCommand.name,
      new AddWallCommandHandler(this.mediator, this.gridStore)
    );
    this.mediator.registerCommandHandler(
      SetStartNodeCommand.name,
      new SetStartNodeCommandHandler(this.mediator, this.gridStore)
    );
  }
}
