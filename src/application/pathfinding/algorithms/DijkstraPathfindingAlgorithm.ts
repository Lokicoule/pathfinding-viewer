import { Grid, Node } from "@domain/environment";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class DijkstraPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(
    grid: Grid,
    startNode: Node,
    endNode: Node
  ): DijkstraPathfindingAlgorithm {
    return new DijkstraPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const unvisitedNodes = this.grid.getNodes().flat();

    this.startNode.setDistance(0);

    this.sortNodesByDistance(unvisitedNodes);

    while (unvisitedNodes.length > 0) {
      const closestNode = unvisitedNodes.shift();

      if (closestNode && !closestNode.isType("Wall")) {
        if (closestNode.getDistance() === Infinity) {
          return;
        }

        if (closestNode.isNotType("Start", "End")) {
          closestNode.setType("Explored");
        }

        this.queue.enqueue(closestNode);

        if (closestNode.isType("End")) {
          return;
        }

        this.updateUnvisitedNeighbors(closestNode);
        this.sortNodesByDistance(unvisitedNodes);
      }
    }
  }

  private sortNodesByDistance(nodes: Node[]): void {
    nodes.sort((nodeA, nodeB) => nodeA.getDistance() - nodeB.getDistance());
  }

  private updateUnvisitedNeighbors(node: Node): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);

    for (const neighbor of unvisitedNeighbors) {
      const tentativeDistance = node.getDistance() + 1;

      if (tentativeDistance < neighbor.getDistance()) {
        neighbor.setDistance(tentativeDistance);
        neighbor.setPreviousNode(node);
      }
    }
  }
}
