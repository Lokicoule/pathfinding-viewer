import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { Result } from "../../../domain/types/Result";
import { Store } from "../../../infrastructure/store/Store";

export type GridStoreState = {
  grid: Node[][];
  startNode: Node;
  endNode: Node;
};

export class GridStore extends Store<GridStoreState> {
  constructor(width: number, height: number) {
    super({
      grid: GridStore.initializeGrid(width, height),
      startNode: Node.create({ x: 1, y: 1, type: NodeType.Start }),
      endNode: Node.create({ x: width - 2, y: height - 2, type: NodeType.End }),
    });

    this.state.grid[this.state.startNode.getY()][this.state.startNode.getX()] =
      this.state.startNode;
    this.state.grid[this.state.endNode.getY()][this.state.endNode.getX()] =
      this.state.endNode;
  }

  public getGrid(): Node[][] {
    return this.state.grid;
  }

  public getNode(x: number, y: number): Node | undefined {
    if (this.isValidPosition(x, y)) {
      return this.state.grid[y][x];
    }
    return undefined;
  }

  public setNodeType(x: number, y: number, type: NodeType): Result {
    const validation = this.isValidPosition(x, y);

    if (validation.success) {
      this.state.grid[y][x] = Node.create({
        x,
        y,
        type,
      });

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  public getStartNode(): Node {
    return this.state.startNode;
  }

  public setStartNode(x: number, y: number): Result {
    const validation = this.isValidPosition(x, y);

    if (validation.success) {
      this.state.startNode = this.state.grid[y][x];
      this.state.startNode.setType(NodeType.Start);

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  public getEndNode(): Node {
    return this.state.endNode;
  }

  public setEndNode(x: number, y: number): Result {
    const validation = this.isValidPosition(x, y);

    if (validation.success) {
      this.state.endNode = this.state.grid[y][x];
      this.state.endNode.setType(NodeType.End);

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  private isValidPosition(x: number, y: number): Result {
    if (
      x >= 0 &&
      x < this.state.grid[0].length &&
      y >= 0 &&
      y < this.state.grid.length
    ) {
      return { success: true };
    }

    return {
      success: false,
      error: {
        message: `Invalid position: (${x}, ${y})`,
      },
    };
  }

  public static initializeGrid(width: number, height: number): Node[][] {
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
