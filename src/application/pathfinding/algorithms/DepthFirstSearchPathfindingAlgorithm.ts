import { Grid } from "@domain/entities/Grid";
import { Node } from "@domain/entities/Node";
import { Stack } from "@infra/datastructures/Stack";
import { Algorithm } from "@domain/interfaces/Algorithm";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class DepthFirstSearchPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(grid: Grid, startNode: Node, endNode: Node): Algorithm {
    return new DepthFirstSearchPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const stack: Stack<Node> = new Stack();

    stack.push(this.startNode);

    while (!stack.isEmpty()) {
      const currentNode = stack.pop();

      if (currentNode && !currentNode.isExplored() && !currentNode.isWall()) {
        if (!currentNode.isStart() && !currentNode.isEnd()) {
          currentNode.setExplored();
        }

        this.queue.enqueue(currentNode);

        if (currentNode.isEnd()) {
          return;
        }

        const unvisitedNeighbors = this.getUnvisitedNeighbors(currentNode);

        for (const neighbor of unvisitedNeighbors) {
          neighbor.setPreviousNode(currentNode);
          stack.push(neighbor);
        }
      }
    }
  }
}
