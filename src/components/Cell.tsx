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
  private props: CellProps;
  private constructor(props: CellProps) {
    this.props = props;
  }

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
    context.lineWidth = 1;
    context.fillRect(x, y, size - 1, size - 1);
  }

  public set state(state: CellState) {
    this.props.state = state;
  }

  public get isStart(): boolean {
    return this.props.state === CellState.Start;
  }

  public get isEnd(): boolean {
    return this.props.state === CellState.End;
  }

  public get isWall(): boolean {
    return this.props.state === CellState.Wall;
  }

  public get isPath(): boolean {
    return this.props.state === CellState.Path;
  }

  public get isExplored(): boolean {
    return this.props.state === CellState.Explored;
  }

  public get isFrontier(): boolean {
    return this.props.state === CellState.Frontier;
  }

  public get isEmpty(): boolean {
    return this.props.state === CellState.Empty;
  }
}
