import { Grid, Node } from "@domain/environment";
import { Queue } from "@infra/datastructures";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class BreadthFirstSearchPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(
    grid: Grid,
    startNode: Node,
    endNode: Node
  ): BreadthFirstSearchPathfindingAlgorithm {
    return new BreadthFirstSearchPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const nodesToVisitQueue: Queue<Node> = new Queue();

    nodesToVisitQueue.enqueue(this.startNode);

    while (!nodesToVisitQueue.isEmpty()) {
      const currentNode = nodesToVisitQueue.dequeue();

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
          nodesToVisitQueue.enqueue(neighbor);
        }
      }
    }
  }
}
