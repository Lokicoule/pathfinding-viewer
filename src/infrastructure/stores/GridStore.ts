import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { Result } from "../../domain/types/Result";

export class GridStore {
  private grid: Node[][];
  private startNode!: Node;
  private endNode!: Node;

  constructor(width: number, height: number) {
    this.grid = this.initializeGrid(width, height);
    this.setStartNode(1, 1);
    this.setEndNode(width - 2, height - 2);
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

  public setNodeType(x: number, y: number, type: NodeType): Result {
    const validation = this.isValidPosition(x, y);

    if (validation.success) {
      this.grid[y][x] = Node.create({
        x,
        y,
        type,
      });
      return { success: true };
    }

    return validation;
  }

  public getStartNode(): Node {
    return this.startNode;
  }

  public setStartNode(x: number, y: number): Result {
    const validation = this.isValidPosition(x, y);

    if (validation.success) {
      this.startNode = this.grid[y][x];
      this.startNode.setType(NodeType.Start);
      return { success: true };
    }

    return validation;
  }

  public getEndNode(): Node {
    return this.endNode;
  }

  public setEndNode(x: number, y: number): Result {
    const validation = this.isValidPosition(x, y);

    if (validation.success) {
      this.endNode = this.grid[y][x];
      this.endNode.setType(NodeType.End);

      return { success: true };
    }

    return validation;
  }

  private isValidPosition(x: number, y: number): Result {
    if (x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) {
      return { success: true };
    }

    return {
      success: false,
      error: {
        message: `Invalid position: (${x}, ${y})`,
      },
    };
  }

  private initializeGrid(width: number, height: number): Node[][] {
    const grid = new Array(height);
    for (let y = 0; y < height; y++) {
      grid[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        grid[y][x] = Node.create({ x, y, type: NodeType.Empty });
      }
    }

    return grid;
  }
}
