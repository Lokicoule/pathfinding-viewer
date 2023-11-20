import { Grid } from "@domain/entities/Grid";
import { Node } from "@domain/entities/Node";
import { Queue } from "@infra/datastructures";
import { Algorithm } from "@domain/interfaces/Algorithm";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class BreadthFirstSearchPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(grid: Grid, startNode: Node, endNode: Node): Algorithm {
    return new BreadthFirstSearchPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const nodesToVisitQueue: Queue<Node> = new Queue();

    nodesToVisitQueue.enqueue(this.startNode);

    while (!nodesToVisitQueue.isEmpty()) {
      const currentNode = nodesToVisitQueue.dequeue();

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
          nodesToVisitQueue.enqueue(neighbor);
        }
      }
    }
  }
}
