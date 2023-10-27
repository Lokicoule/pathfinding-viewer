import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { Result } from "../../domain/types/Result";
import { Vector } from "../../domain/valueObjects/Vector";
import { Store } from "../../infrastructure/store/Store";

export type GridStoreState = {
  grid: Node[][];
  startNode: Node;
  endNode: Node;
};

export class GridStore extends Store<GridStoreState> {
  constructor(width: number, height: number) {
    super({
      grid: GridStore.initializeGrid(width, height),
      startNode: Node.create({
        vector: { x: 1, y: 1 },
        type: NodeType.Start,
      }),
      endNode: Node.create({
        type: NodeType.End,
        vector: { x: width - 2, y: height - 2 },
      }),
    });

    this.state.grid[this.state.startNode.getVector().y][
      this.state.startNode.getVector().x
    ] = this.state.startNode;
    this.state.grid[this.state.endNode.getVector().y][
      this.state.endNode.getVector().x
    ] = this.state.endNode;
  }

  public getGrid(): Node[][] {
    return this.state.grid;
  }

  public getNode(vector: Vector): Node | undefined {
    if (this.isValidPosition(vector)) {
      return this.state.grid[vector.y][vector.x];
    }
    return undefined;
  }

  public setNodeType(vector: Vector, type: NodeType): Result {
    const validation = this.isValidPosition(vector);

    if (validation.success) {
      this.state.grid[vector.y][vector.x] = Node.create({
        vector,
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

  public setStartNode(vector: Vector): Result {
    const validation = this.isValidPosition(vector);

    if (validation.success) {
      this.state.startNode = this.state.grid[vector.y][vector.x];
      this.state.startNode.setType(NodeType.Start);

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  public getEndNode(): Node {
    return this.state.endNode;
  }

  public setEndNode(vector: Vector): Result {
    const validation = this.isValidPosition(vector);

    if (validation.success) {
      this.state.endNode = this.state.grid[vector.y][vector.x];
      this.state.endNode.setType(NodeType.End);

      super.setState(this.state);
      return { success: true };
    }

    return validation;
  }

  private isValidPosition(vector: Vector): Result {
    if (
      vector.x >= 0 &&
      vector.x < this.state.grid[0].length &&
      vector.y >= 0 &&
      vector.y < this.state.grid.length
    ) {
      return { success: true };
    }

    return {
      success: false,
      error: {
        message: `Invalid position: (${vector.x}, ${vector.y})`,
      },
    };
  }

  public static initializeGrid(width: number, height: number): Node[][] {
    const grid = new Array(height);
    for (let y = 0; y < height; y++) {
      grid[y] = new Array(width);
      for (let x = 0; x < width; x++) {
        grid[y][x] = Node.create({
          type: NodeType.Empty,
          vector: { x, y },
        });
      }
    }

    return grid;
  }
}
