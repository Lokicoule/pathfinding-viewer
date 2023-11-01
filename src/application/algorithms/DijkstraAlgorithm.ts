import { Node } from "../../domain/entities/Node";
import { NodeType } from "../../domain/enums/NodeType";
import { Algorithm } from "../../domain/interfaces/Algorithm";

export class DijkstraAlgorithm implements Algorithm {
  private readonly grid: Node[][];
  private readonly startNode: Node;
  private readonly endNode: Node;

  private constructor(grid: Node[][], startNode: Node, endNode: Node) {
    this.grid = grid;
    this.startNode = startNode;
    this.endNode = endNode;
  }

  public static create(
    grid: Node[][],
    startNode: Node,
    endNode: Node
  ): Algorithm {
    return new DijkstraAlgorithm(grid, startNode, endNode);
  }

  public run(): Node[] {
    const visitedNodesInOrder: Node[] = [];
    this.startNode.setDistance(0);
    const unvisitedNodes = this.initializeNodes();
    this.sortNodesByDistance(unvisitedNodes);

    while (unvisitedNodes.length > 0) {
      const closestNode = unvisitedNodes.shift();

      if (closestNode && !closestNode.isWall()) {
        if (closestNode.getDistance() === Infinity) {
          return visitedNodesInOrder;
        }

        if (
          closestNode.getType() !== NodeType.Start &&
          closestNode.getType() !== NodeType.End
        ) {
          closestNode.setExplored();
        }

        visitedNodesInOrder.push(closestNode);

        if (closestNode === this.endNode) {
          return visitedNodesInOrder;
        }

        this.updateUnvisitedNeighbors(closestNode);
        this.sortNodesByDistance(unvisitedNodes);
      }
    }

    return visitedNodesInOrder;
  }

  private initializeNodes(): Node[] {
    const nodes: Node[] = [];

    for (const row of this.grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }

    return nodes;
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
    const neighbors: Node[] = [];
    const { x, y } = node.getVector();

    if (y > 0) neighbors.push(this.grid[y - 1][x]);
    if (y < this.grid.length - 1) neighbors.push(this.grid[y + 1][x]);
    if (x > 0) neighbors.push(this.grid[y][x - 1]);
    if (x < this.grid[0].length - 1) neighbors.push(this.grid[y][x + 1]);

    return neighbors.filter((neighbor) => !neighbor.isExplored());
  }
}