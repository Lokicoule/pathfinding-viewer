import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { Algorithm } from "../../domain/interfaces/Algorithm";

export class DepthFirstSearchAlgorithm implements Algorithm {
  private constructor(
    private readonly grid: Node[][],
    private readonly startNode: Node,
    private readonly endNode: Node
  ) {}

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): Algorithm {
    return new DepthFirstSearchAlgorithm(grid, startNode, endNode);
  }

  public run(): Node[] {
    const visitedNodesInOrder: Node[] = [];
    const stack: Node[] = [];

    stack.push(this.startNode);

    while (stack.length > 0) {
      const currentNode = stack.pop();

      if (currentNode && !currentNode.isExplored() && !currentNode.isWall()) {
        if (
          currentNode.getType() !== NodeType.Start &&
          currentNode !== this.endNode
        ) {
          currentNode.setExplored();
        }

        visitedNodesInOrder.push(currentNode);

        if (currentNode === this.endNode) {
          return visitedNodesInOrder;
        }

        const unvisitedNeighbors = this.getUnvisitedNeighbors(currentNode);

        for (const neighbor of unvisitedNeighbors) {
          neighbor.setPreviousNode(currentNode);
          stack.push(neighbor);
        }
      }
    }

    return visitedNodesInOrder;
  }

  private getUnvisitedNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node.getVector();

    if (y > 0) neighbors.push(this.grid[y - 1][x]);
    if (y < this.grid.length - 1) neighbors.push(this.grid[y + 1][x]);
    if (x > 0) neighbors.push(this.grid[y][x - 1]);
    if (x < this.grid[0].length - 1) neighbors.push(this.grid[y][x + 1]);

    return neighbors.filter((neighbor) => !neighbor.isExplored());
  }
}
