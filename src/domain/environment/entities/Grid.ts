import { NodeType } from "../types/NodeType";
import { Vector } from "../valueObjects/Vector";
import { Node } from "./Node";

export class Grid {
  private nodes: Node[][];

  private constructor(
    public readonly width: number,
    public readonly height: number
  ) {
    this.nodes = [];

    for (let i = 0; i < this.height; i++) {
      this.nodes.push([]);

      for (let j = 0; j < this.width; j++) {
        this.nodes[i].push(
          Node.create({
            type: "Empty",
            vector: { x: j, y: i },
          })
        );
      }
    }
  }

  public static create(width: number, height: number): Grid {
    return new Grid(width, height);
  }

  public isValidPosition(vector: Vector): boolean {
    return (
      vector.x >= 0 &&
      vector.x < this.width &&
      vector.y >= 0 &&
      vector.y < this.height
    );
  }

  public getNode(x: number, y: number): Node {
    if (!this.isValidPosition(new Vector(x, y))) {
      throw new Error("Invalid position");
    }

    return this.nodes[y][x];
  }

  public getNodes(): Node[][] {
    return this.nodes;
  }

  public getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node.getVector();

    if (y > 0) neighbors.push(this.nodes[y - 1][x]);
    if (y < this.nodes.length - 1) neighbors.push(this.nodes[y + 1][x]);
    if (x > 0) neighbors.push(this.nodes[y][x - 1]);
    if (x < this.nodes[0].length - 1) neighbors.push(this.nodes[y][x + 1]);

    return neighbors;
  }

  public setNodeAs(vector: Vector, type: NodeType): void {
    if (!this.isValidPosition(vector)) {
      throw new Error("Invalid position");
    }

    const node = this.getNode(vector.x, vector.y);

    this.nodes[vector.y][vector.x] = Node.create({
      type,
      vector,
      previousType: node.getType(),
    });
  }

  public initialize(type: NodeType, start?: Vector, end?: Vector): Grid {
    this.nodes = [];

    for (let i = 0; i < this.height; i++) {
      this.nodes.push([]);

      for (let j = 0; j < this.width; j++) {
        this.nodes[i].push(
          Node.create({
            type,
            vector: { x: j, y: i },
          })
        );
      }
    }

    if (start && this.isValidPosition(start)) this.setNodeAs(start, "Start");
    if (end && this.isValidPosition(end)) this.setNodeAs(end, "End");

    return this;
  }

  public swapNodes(vectorA: Vector, vectorB: Vector): void {
    if (!this.isValidPosition(vectorA)) {
      throw new Error("Invalid position");
    }

    if (!this.isValidPosition(vectorB)) {
      throw new Error("Invalid position");
    }

    const nodeA = this.getNode(vectorA.x, vectorA.y);
    const nodeB = this.getNode(vectorB.x, vectorB.y);

    this.setNodeAs(vectorA, nodeB.getType());
    this.setNodeAs(vectorB, nodeA.getType());
  }

  public copy(): Grid {
    const grid = Grid.create(this.width, this.height);

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes[i].length; j++) {
        grid.nodes[i][j] = this.nodes[i][j].copy();
      }
    }

    return grid;
  }

  public clear(...nodeTypes: NodeType[]): Grid {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes[i].length; j++) {
        if (nodeTypes.includes(this.nodes[i][j].getType())) {
          this.nodes[i][j].setType("Empty");
        }
      }
    }

    return this;
  }
}
