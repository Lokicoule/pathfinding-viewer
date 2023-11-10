import { Node } from "../../domain/entities/Node";
import { Stack } from "../../domain/entities/Stack";
import { Algorithm } from "../../domain/interfaces/Algorithm";

export class DepthFirstSearchAlgorithm implements Algorithm {
  private constructor(
    private readonly grid: Node[][],
    private readonly startNode: Node
  ) {}

  public static create(grid: Node[][], startNode: Node): Algorithm {
    return new DepthFirstSearchAlgorithm(grid, startNode);
  }

  public run(): Node[] {
    const visitedNodesInOrder: Node[] = [];
    const stack: Stack<Node> = new Stack();

    stack.push(this.startNode);

    while (!stack.isEmpty()) {
      const currentNode = stack.pop();

      if (currentNode && !currentNode.isExplored() && !currentNode.isWall()) {
        if (!currentNode.isStart() && !currentNode.isEnd()) {
          currentNode.setExplored();
        }

        visitedNodesInOrder.push(currentNode);

        if (currentNode.isEnd()) {
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
