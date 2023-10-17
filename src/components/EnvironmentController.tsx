import { UpdateCellStateCommand } from "../application/commands";
import { CompositionRoot } from "../application/composition";
import { CellState } from "./Cell";

export class EnvironmentController {
  private constructor(private readonly compositionRoot: CompositionRoot) {}

  public static create(
    compositionRoot: CompositionRoot
  ): EnvironmentController {
    return new EnvironmentController(compositionRoot);
  }

  public handleCellChange(offsetX: number, offsetY: number) {
    const row = Math.floor(offsetY / 40);
    const col = Math.floor(offsetX / 40);

    console.log(`Cell clicked: row = ${row}, col = ${col}`);
    this.compositionRoot.eventBus.publish(
      UpdateCellStateCommand.create({
        cell: this.compositionRoot.cache.get("grid").getCell(row, col),
        state: CellState.Wall,
      })
    );
  }
}
