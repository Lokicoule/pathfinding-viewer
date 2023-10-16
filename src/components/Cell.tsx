export enum CellState {
  Empty,
  Start,
  End,
  Wall,
  Path,
  Explored,
  Frontier,
}

type CellProps = {
  state: CellState;
  size: number;
  context: CanvasRenderingContext2D;
};

const CELL_STATE_COLORS: Map<CellState, string> = new Map([
  [CellState.Empty, "white"],
  [CellState.Start, "blue"],
  [CellState.End, "red"],
  [CellState.Wall, "black"],
  [CellState.Path, "green"],
  [CellState.Explored, "gray"],
  [CellState.Frontier, "orange"],
]);

export class Cell {
  private constructor(public readonly props: CellProps) {}

  public static create(
    state: CellState,
    size: number,
    context: CanvasRenderingContext2D
  ): Cell {
    return new Cell({ state, size, context });
  }

  public show(row: number, col: number): void {
    const { state, size, context } = this.props;

    const x = col * size;
    const y = row * size;

    context.fillStyle =
      CELL_STATE_COLORS.get(state) ?? CELL_STATE_COLORS.get(CellState.Empty)!;
    context.strokeRect(x, y, size, size);
    context.strokeStyle = "gray";
    context.fillRect(x, y, size, size);
  }
}
