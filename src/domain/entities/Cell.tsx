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
  x: number;
  y: number;
};

export class Cell {
  private props: CellProps;
  private constructor(props: CellProps) {
    this.props = props;
  }

  public static create(props: CellProps): Cell {
    return new Cell(props);
  }

  public set state(state: CellState) {
    this.props.state = state;
  }

  public get x(): number {
    return this.props.x;
  }

  public get y(): number {
    return this.props.y;
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

  public get isWallable(): boolean {
    return (
      this.props.state === CellState.Empty ||
      this.props.state === CellState.Frontier ||
      this.props.state === CellState.Explored ||
      this.props.state === CellState.Path
    );
  }

  public get isTraversable(): boolean {
    return (
      this.props.state === CellState.Empty ||
      this.props.state === CellState.Frontier ||
      this.props.state === CellState.Explored ||
      this.props.state === CellState.Path
    );
  }

  public get isStartable(): boolean {
    return (
      this.props.state === CellState.Empty ||
      this.props.state === CellState.Frontier ||
      this.props.state === CellState.Explored ||
      this.props.state === CellState.Path ||
      this.props.state === CellState.Wall
    );
  }

  public get isEndable(): boolean {
    return (
      this.props.state === CellState.Empty ||
      this.props.state === CellState.Frontier ||
      this.props.state === CellState.Explored ||
      this.props.state === CellState.Path ||
      this.props.state === CellState.Wall
    );
  }
}
