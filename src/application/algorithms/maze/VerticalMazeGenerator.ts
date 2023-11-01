import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";

export class VerticalMazeGenerator {
  private grid: Node[][];
  private startNode: Node;
  private endNode: Node;
  private walls: Node[] = [];
  private MAX_HOLES = 3;

  private constructor(grid: Node[][], startNode: Node, endNode: Node) {
    this.grid = grid;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): VerticalMazeGenerator {
    return new VerticalMazeGenerator(grid, startNode, endNode);
  }

  public generateMaze(): Node[] {
    const verticalNodes = this.getVerticalNodes(this.grid.length);
    const horizontalNodes = this.getHorizontalNodes(this.grid[0].length);

    this.getHorizontalWalls(verticalNodes, horizontalNodes);

    return this.walls;
  }

  private getVerticalNodes(length: number): Node[] {
    const verticalNodes: Node[] = [];
    for (let i = 0; i < length; i++) {
      verticalNodes.push(this.grid[i][0]);
    }
    return verticalNodes;
  }

  private getHorizontalNodes(length: number): Node[] {
    const horizontalNodes: Node[] = [];
    for (let i = 0; i < length; i++) {
      horizontalNodes.push(this.grid[0][i]);
    }
    return horizontalNodes;
  }

  private getHorizontalWalls(
    verticalNodes: Node[],
    horizontalNodes: Node[]
  ): void {
    if (horizontalNodes.length < 2) {
      return;
    }

    const choice = Math.floor(Math.random() * 2);
    for (const horizontalNode of horizontalNodes) {
      if (
        (choice === 0 && horizontalNode.getVector().x % 2 !== 0) ||
        (choice === 1 && horizontalNode.getVector().x % 2 === 0)
      ) {
        this.addWall(horizontalNode, verticalNodes);
      }
    }
  }

  private addWall(horizontalNode: Node, verticalNodes: Node[]): void {
    const tempWalls: Node[] = [];

    for (const verticalNode of verticalNodes) {
      if (!this.isStartOrEndNode(horizontalNode, verticalNode)) {
        this.grid[verticalNode.getVector().y][
          horizontalNode.getVector().x
        ].setWall();
        tempWalls.push(
          this.grid[verticalNode.getVector().y][horizontalNode.getVector().x]
        );
      }
    }

    this.walls = [...this.walls, ...this.randomizeHoles(tempWalls)];
  }

  private isStartOrEndNode(horizontalNode: Node, verticalNode: Node): boolean {
    return (
      this.startNode.equals(
        this.grid[verticalNode.getVector().y][horizontalNode.getVector().x]
      ) ||
      this.endNode.equals(
        this.grid[verticalNode.getVector().y][horizontalNode.getVector().x]
      )
    );
  }

  private randomizeHoles(walls: Node[]): Node[] {
    const randomEmptyNodeCount = Math.floor(Math.random() * this.MAX_HOLES) + 1;
    const newWalls = [...walls];

    for (let i = 0; i < randomEmptyNodeCount; i++) {
      const randomIndex = Math.floor(Math.random() * newWalls.length);

      newWalls.push(
        Node.create({
          type: NodeType.Empty,
          vector: newWalls[randomIndex].getVector(),
        })
      );
    }

    return newWalls;
  }
}
