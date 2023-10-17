import { Cell, CellState } from "./Cell";

type GridProps = {
  rows: number;
  cols: number;
};

type GridState = {
  grid: Cell[][];
  props: GridProps;
};

export class Grid {
  private state: GridState;

  private constructor(props: GridProps) {
    this.state = {
      grid: this.initialize(props),
      props,
    };
  }

  public static create(props: GridProps): Grid {
    return new Grid(props);
  }

  public getCells(): Cell[][] {
    return this.state.grid;
  }

  public getCell(row: number, col: number): Cell {
    return this.state.grid[row][col];
  }

  public reset(): void {
    this.state.grid = this.initialize(this.state.props);
  }

  public updateCell(cell: Cell): void {
    const { grid } = this.state;

    const row = grid[cell.y];
    const col = row[cell.x];

    col.state = cell.state;

    this.state.grid = grid;
  }

  private initialize(props: GridProps): Cell[][] {
    const { rows, cols } = props;

    const grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < cols; j++) {
        const cell = Cell.create({
          state: CellState.Empty,
          x: j,
          y: i,
        });
        row.push(cell);
      }
      grid.push(row);
    }

    grid[2][2].state = CellState.Start;
    grid[2][4].state = CellState.End;
    grid[2][6].state = CellState.Wall;
    grid[2][8].state = CellState.Explored;
    grid[2][10].state = CellState.Frontier;
    grid[2][12].state = CellState.Path;

    return grid;
  }
}
