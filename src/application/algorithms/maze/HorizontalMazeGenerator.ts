import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";

export class HorizontalMazeGenerator {
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
  ): HorizontalMazeGenerator {
    return new HorizontalMazeGenerator(grid, startNode, endNode);
  }

  public generateMaze(): Node[] {
    const verticalNodes = this.getNodesInVerticalDirection();
    const horizontalNodes = this.getNodesInHorizontalDirection();

    this.generateHorizontalWalls(verticalNodes, horizontalNodes);

    return this.walls;
  }

  private getNodesInVerticalDirection(): Node[] {
    const verticalNodes: Node[] = [];
    for (let i = 0; i < this.grid.length; i++) {
      verticalNodes.push(this.grid[i][0]);
    }
    return verticalNodes;
  }

  private getNodesInHorizontalDirection(): Node[] {
    const horizontalNodes: Node[] = [];
    for (let i = 0; i < this.grid[0].length; i++) {
      horizontalNodes.push(this.grid[0][i]);
    }
    return horizontalNodes;
  }

  private generateHorizontalWalls(
    verticalNodes: Node[],
    horizontalNodes: Node[]
  ): void {
    if (verticalNodes.length < 2 || horizontalNodes.length < 2) {
      return;
    }

    const choice = Math.floor(Math.random() * 2); // Updated to generate 0 or 1

    for (const verticalNode of verticalNodes) {
      if (
        (choice === 0 && verticalNode.getVector().y % 2 !== 0) ||
        (choice === 1 && verticalNode.getVector().y % 2 === 0)
      ) {
        this.addHorizontalWall(verticalNode, horizontalNodes);
      }
    }
  }

  private addHorizontalWall(verticalNode: Node, horizontalNodes: Node[]): void {
    const tempWalls: Node[] = [];

    for (const horizontalNode of horizontalNodes) {
      if (!this.isStartOrEndNode(verticalNode, horizontalNode)) {
        this.grid[verticalNode.getVector().y][
          horizontalNode.getVector().x
        ].setWall();
        this;
        tempWalls.push(
          this.grid[verticalNode.getVector().y][horizontalNode.getVector().x]
        );
      }
    }

    this.walls = [...this.walls, ...this.randomizeHole(tempWalls)];
  }

  private isStartOrEndNode(verticalNode: Node, horizontalNode: Node): boolean {
    return (
      this.startNode.equals(
        this.grid[verticalNode.getVector().y][horizontalNode.getVector().x]
      ) ||
      this.endNode.equals(
        this.grid[verticalNode.getVector().y][horizontalNode.getVector().x]
      )
    );
  }

  private randomizeHole(walls: Node[]): Node[] {
    const randomEmptyNodeCount = Math.floor(Math.random() * 3) + 1;
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
