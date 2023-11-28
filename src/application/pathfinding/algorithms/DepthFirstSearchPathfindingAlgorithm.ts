import { Grid, Node } from "@domain/environment";
import { Stack } from "@infra/datastructures";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class DepthFirstSearchPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(
    grid: Grid,
    startNode: Node,
    endNode: Node
  ): DepthFirstSearchPathfindingAlgorithm {
    return new DepthFirstSearchPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const stack: Stack<Node> = new Stack();

    stack.push(this.startNode);

    while (!stack.isEmpty()) {
      const currentNode = stack.pop();

      if (currentNode && currentNode.isNotType("Explored", "Wall")) {
        if (currentNode.isNotType("Start", "End")) {
          currentNode.setType("Explored");
        }

        this.queue.enqueue(currentNode);

        if (currentNode.isType("End")) {
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
