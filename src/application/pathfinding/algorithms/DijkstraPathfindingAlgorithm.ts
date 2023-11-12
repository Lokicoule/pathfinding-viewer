import { Grid } from "../../../domain/entities/Grid";
import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";
import { PathfindingAlgorithm } from "./PathfindingAlgorithm";

export class DijkstraPathfindingAlgorithm extends PathfindingAlgorithm {
  private constructor(grid: Grid, startNode: Node, endNode: Node) {
    super(grid, startNode, endNode);
  }

  public static create(grid: Grid, startNode: Node, endNode: Node): Algorithm {
    return new DijkstraPathfindingAlgorithm(grid, startNode, endNode);
  }

  public runAlgorithm(): void {
    const unvisitedNodes = this.grid.getNodes().flat();

    this.startNode.setDistance(0);

    this.sortNodesByDistance(unvisitedNodes);

    while (unvisitedNodes.length > 0) {
      const closestNode = unvisitedNodes.shift();

      if (closestNode && !closestNode.isWall()) {
        if (closestNode.getDistance() === Infinity) {
          return;
        }

        if (!closestNode.isStart() && !closestNode.isEnd()) {
          closestNode.setExplored();
        }

        this.queue.enqueue(closestNode);

        if (closestNode.isEnd()) {
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
