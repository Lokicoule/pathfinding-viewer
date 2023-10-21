import { Node, NodeType } from "../../domain/entities/Node";

export class GridStore {
  private grid: Node[][];

  constructor(width: number, height: number) {
    this.grid = this.initializeGrid(width, height);
  }

  public getGrid(): Node[][] {
    return this.grid;
  }

  public getNode(x: number, y: number): Node | undefined {
    if (this.isValidPosition(x, y)) {
      return this.grid[y][x];
    }
    return undefined;
  }

  public setNodeType(x: number, y: number, type: NodeType): void {
    if (this.isValidPosition(x, y)) {
      this.grid[y][x] = Node.create({
        x,
        y,
        type,
      });
    }
  }

  private isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length;
  }

  private initializeGrid(width: number, height: number): Node[][] {
    const grid = new Array(height);
    for (let y = 0; y < height; y++) {
      grid[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        grid[y][x] = Node.create({ x, y, type: NodeType.Empty });
      }
    }

    grid[1][1].setType(NodeType.Start);
    grid[height - 2][width - 2].setType(NodeType.End);

    return grid;
  }
}
