import {
  ResetGridCommand,
  UpdateCellStateCommand,
} from "../../application/commands";
import { CompositionRoot } from "../../application/CompositionRoot";
import { CellState, Cell } from "../../domain/entities/Cell";

export class EnvironmentController {
  private constructor(private readonly compositionRoot: CompositionRoot) {}

  public static create(
    compositionRoot: CompositionRoot
  ): EnvironmentController {
    return new EnvironmentController(compositionRoot);
  }

  public handleCellChange(cell: Cell) {
    console.log(`Cell clicked: row = ${cell.x}, col = ${cell.y}`);
    console.log(cell);
    this.compositionRoot.eventBus.publish(
      UpdateCellStateCommand.create({
        cell,
        state: CellState.Wall,
      })
    );
  }

  public handleMenuReset() {
    console.log("Resetting grid");
    this.compositionRoot.eventBus.publish(ResetGridCommand.create());
  }
}
