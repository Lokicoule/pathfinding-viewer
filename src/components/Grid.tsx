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

  public show(): void {
    console.log("Showing grid");
    const { grid } = this.state;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        cell.show(i, j);
      }
    }
  }

  private initialize(props: GridProps): Cell[][] {
    console.log("Initializing grid");
    const { cellSize, canvasContext, rows, cols } = props;

    const grid: Cell[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < cols; j++) {
        const cell = Cell.create(CellState.Empty, cellSize, canvasContext);
        row.push(cell);
      }
      grid.push(row);
    }

    grid[2][2] = Cell.create(CellState.Start, cellSize, canvasContext);
    grid[2][4] = Cell.create(CellState.End, cellSize, canvasContext);
    grid[2][6] = Cell.create(CellState.Wall, cellSize, canvasContext);
    grid[2][8] = Cell.create(CellState.Explored, cellSize, canvasContext);
    grid[2][10] = Cell.create(CellState.Frontier, cellSize, canvasContext);
    grid[2][12] = Cell.create(CellState.Path, cellSize, canvasContext);

    return grid;
  }
}
