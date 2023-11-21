import { Node } from "@domain/environment";
import { MazeAlgorithm } from "./MazeAlgorithm";

enum Direction {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export class RecursiveDivisionMazeAlgorithm extends MazeAlgorithm {
  private constructor(grid: Node[][], startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(grid: Node[][], startNode: Node, endNode: Node) {
    return new RecursiveDivisionMazeAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    this.divide(0, this.grid.length - 1, 0, this.grid[0].length - 1);
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
      if (i !== hole && this.grid[row][i].isNotType("Start", "End")) {
        this.grid[row][i].setType("Wall");
        this.path.push(this.grid[row][i]);
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
      if (i !== hole && this.grid[i][col].isNotType("Start", "End")) {
        this.grid[i][col].setType("Wall");
        this.path.push(this.grid[i][col]);
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
