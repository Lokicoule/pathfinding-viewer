import { Node } from "../../../domain/entities/Node";

export class RecursiveDivisionMazeGenerator {
  private grid: Node[][];
  private startNode: Node;
  private endNode: Node;
  private walls: Node[] = [];

  private constructor(grid: Node[][], startNode: Node, endNode: Node) {
    this.grid = grid;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): RecursiveDivisionMazeGenerator {
    return new RecursiveDivisionMazeGenerator(grid, startNode, endNode);
  }

  public generateMaze(): Node[] {
    this.recursiveDivide(0, this.grid.length - 1, 0, this.grid[0].length - 1);
    return this.walls;
  }

  private recursiveDivide(
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number
  ): void {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2) {
      return;
    }

    const wallRow = this.randomOdd(rowStart, rowEnd);
    const wallCol = this.randomOdd(colStart, colEnd);

    for (let i = colStart; i <= colEnd; i++) {
      if (
        !this.startNode.equals(this.grid[wallRow][i]) &&
        !this.endNode.equals(this.grid[wallRow][i])
      ) {
        this.grid[wallRow][i].setWall();
        this.walls.push(this.grid[wallRow][i]);
      }
    }
    for (let i = rowStart; i <= rowEnd; i++) {
      if (
        !this.startNode.equals(this.grid[i][wallCol]) &&
        !this.endNode.equals(this.grid[i][wallCol])
      ) {
        this.grid[i][wallCol].setWall();
        this.walls.push(this.grid[i][wallCol]);
      }
    }

    const gapRow1 = this.randomEven(rowStart, wallRow - 1);
    const gapRow2 = this.randomEven(wallRow + 1, rowEnd);
    const gapCol1 = this.randomEven(colStart, wallCol - 1);
    const gapCol2 = this.randomEven(wallCol + 1, colEnd);

    this.grid[gapRow1][wallCol].setEmpty();
    this.grid[gapRow2][wallCol].setEmpty();
    this.grid[wallRow][gapCol1].setEmpty();
    this.grid[wallRow][gapCol2].setEmpty();

    this.recursiveDivide(rowStart, wallRow - 1, colStart, wallCol - 1);
    this.recursiveDivide(rowStart, wallRow - 1, wallCol + 1, colEnd);
    this.recursiveDivide(wallRow + 1, rowEnd, colStart, wallCol - 1);
    this.recursiveDivide(wallRow + 1, rowEnd, wallCol + 1, colEnd);
  }

  private randomEven(start: number, end: number): number {
    let num = 2 * Math.floor(Math.random() * ((end - start) / 2 + 1)) + start;
    if (num > end) {
      num -= 2;
    }
    return num;
  }

  private randomOdd(start: number, end: number): number {
    let num = 2 * Math.floor(Math.random() * ((end - start) / 2)) + start + 1;
    if (num > end) {
      num -= 2;
    }
    return num;
  }
}
