import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export class RecursiveDivisionAlgorithm implements Algorithm {
  private grid: Node[][];
  private walls: Node[] = [];

  private constructor(grid: Node[][]) {
    this.grid = grid;
  }

  public static create(grid: Node[][]): RecursiveDivisionAlgorithm {
    return new RecursiveDivisionAlgorithm(grid);
  }

  public run(): Node[] {
    this.divide(0, this.grid.length - 1, 0, this.grid[0].length - 1);

    return this.walls;
  }

  private divide(
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number
  ): void {
    const row = rowEnd - rowStart;
    const col = colEnd - colStart;

    if (row <= 0 || col <= 0) return;

    if (this.getDirection(row, col) === Direction.Horizontal) {
      const splitRow = this.getRandomNumber(
        rowStart,
        rowEnd,
        (num) => num % 2 === 0
      );

      this.addHorizontalWalls(splitRow, colStart, colEnd);

      this.divide(rowStart, splitRow - 1, colStart, colEnd);
      this.divide(splitRow + 1, rowEnd, colStart, colEnd);
    } else {
      const splitCol = this.getRandomNumber(
        colStart,
        colEnd,
        (num) => num % 2 === 0
      );

      this.addVerticalWalls(splitCol, rowStart, rowEnd);

      this.divide(rowStart, rowEnd, colStart, splitCol - 1);
      this.divide(rowStart, rowEnd, splitCol + 1, colEnd);
    }
  }

  private getDirection(row: number, col: number): Direction {
    if (row < col) return Direction.Vertical;
    else if (col < row) return Direction.Horizontal;
    else
      return Math.floor(Math.random() * 2)
        ? Direction.Horizontal
        : Direction.Vertical;
  }

  private addHorizontalWalls(
    row: number,
    colStart: number,
    colEnd: number
  ): void {
    const hole = this.getRandomNumber(colStart, colEnd, (num) => num % 2 === 1);

    for (let i = colStart; i <= colEnd; i++) {
      if (
        i !== hole &&
        !this.grid[row][i].isStart() &&
        !this.grid[row][i].isEnd()
      ) {
        this.grid[row][i].setWall();
        this.walls.push(this.grid[row][i]);
      }
    }
  }

  private addVerticalWalls(
    col: number,
    rowStart: number,
    rowEnd: number
  ): void {
    const hole = this.getRandomNumber(rowStart, rowEnd, (num) => num % 2 === 1);

    for (let i = rowStart; i <= rowEnd; i++) {
      if (
        i !== hole &&
        !this.grid[i][col].isStart() &&
        !this.grid[i][col].isEnd()
      ) {
        this.grid[i][col].setWall();
        this.walls.push(this.grid[i][col]);
      }
    }
  }

  private getRandomNumber(
    min: number,
    max: number,
    condition: (num: number) => boolean
  ): number {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;

    while (condition(num)) {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return num;
  }
}
