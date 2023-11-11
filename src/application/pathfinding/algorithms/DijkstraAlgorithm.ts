import { Grid } from "../../../domain/entities/Grid";
import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class DijkstraAlgorithm implements Algorithm {
  private readonly grid: Grid;
  private readonly startNode: Node;

  private constructor(grid: Grid, startNode: Node) {
    this.grid = grid;
    this.startNode = startNode;
  }

  public static create(grid: Grid, startNode: Node): Algorithm {
    return new DijkstraAlgorithm(grid, startNode);
  }

  public run(): Node[] {
    const visitedNodesInOrder: Node[] = [];
    const unvisitedNodes = this.grid.getNodes().flat();

    this.startNode.setDistance(0);

    this.sortNodesByDistance(unvisitedNodes);

    while (unvisitedNodes.length > 0) {
      const closestNode = unvisitedNodes.shift();

      if (closestNode && !closestNode.isWall()) {
        if (closestNode.getDistance() === Infinity) {
          return visitedNodesInOrder;
        }

        if (!closestNode.isStart() && !closestNode.isEnd()) {
          closestNode.setExplored();
        }

        visitedNodesInOrder.push(closestNode);

        if (closestNode.isEnd()) {
          return visitedNodesInOrder;
        }

        this.updateUnvisitedNeighbors(closestNode);
        this.sortNodesByDistance(unvisitedNodes);
      }
    }

    return visitedNodesInOrder;
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

  private getUnvisitedNeighbors(node: Node): Node[] {
    return this.grid
      .getNeighbors(node)
      .filter((neighbor) => !neighbor.isExplored());
  }
}