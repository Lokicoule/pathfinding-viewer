import { Grid, Node } from "@domain/environment";
import { PriorityQueue } from "@infra/datastructures";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class AStarPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(
    grid: Grid,
    startNode: Node,
    endNode: Node
  ): AStarPathfindingAlgorithm {
    return new AStarPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const priorityQueue = new PriorityQueue<Node>();

    this.startNode.setG(0);
    this.startNode.setH(this.calculateDistance(this.startNode, this.endNode));
    priorityQueue.enqueue(this.startNode, this.startNode.getTotalCost());

    while (!priorityQueue.isEmpty()) {
      const currentNode = priorityQueue.dequeue();

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
          const tentativeG = currentNode.getG() + 1;

          if (tentativeG < neighbor.getG()) {
            neighbor.setPreviousNode(currentNode);
            neighbor.setG(tentativeG);
            neighbor.setH(this.calculateDistance(neighbor, this.endNode));
            priorityQueue.enqueue(neighbor, neighbor.getTotalCost());
          }
        }
      }
    }
  }
}
