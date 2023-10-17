import { Cell, CellState } from "./Cell";

type GridProps = {
  rows: number;
  cols: number;
  cellSize: number;
  canvasContext: CanvasRenderingContext2D;
};

type GridState = {
  grid: Cell[][];
};

export class Grid {
  private state: GridState;

  private constructor(props: GridProps) {
    this.state = {
      grid: this.initialize(props),
    };
  }

  public static create(props: GridProps): Grid {
    return new Grid(props);
  }

  public getCell(row: number, col: number): Cell {
    return this.state.grid[row][col];
  }

  public show(): void {
    console.log("Showing grid");
    const { grid } = this.state;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        cell.show();
      }
    }
  }

  public updateCellState(row: number, col: number, state: CellState): void {
    const { grid } = this.state;
    grid[row][col].state = state;

    this.show();
  }

  private initialize(props: GridProps): Cell[][] {
    console.log("Initializing grid");
    const { cellSize, canvasContext, rows, cols } = props;

    const grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < cols; j++) {
        const cell = Cell.create({
          state: CellState.Empty,
          size: cellSize,
          x: j,
          y: i,
          context: canvasContext,
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
