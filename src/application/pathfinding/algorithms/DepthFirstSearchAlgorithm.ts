import { Grid } from "../../../domain/entities/Grid";
import { Node } from "../../../domain/entities/Node";
import { Stack } from "../../../infrastructure/datastructures/Stack";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class DepthFirstSearchAlgorithm implements Algorithm {
  private constructor(
    private readonly grid: Grid,
    private readonly startNode: Node
  ) {}

  public static create(grid: Grid, startNode: Node): Algorithm {
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
    return this.grid
      .getNeighbors(node)
      .filter((neighbor) => !neighbor.isExplored());
  }
}
