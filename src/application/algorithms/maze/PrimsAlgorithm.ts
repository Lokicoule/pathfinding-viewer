import { GraphBuilder } from "../../../domain/builders/GraphBuilder";
import { Graph } from "../../../domain/entities/Graph";
import { Node } from "../../../domain/entities/Node";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class PrimsAlgorithm implements Algorithm {
  private readonly graph: Graph<Node>;
  private readonly startNode: Node;

  private constructor(graph: Graph<Node>, startNode: Node) {
    this.graph = graph;
    this.startNode = startNode;
  }

  public static create(nodes: Node[][], startNode: Node): Algorithm {
    const graph = GraphBuilder.build(nodes);

    return new PrimsAlgorithm(graph, startNode);
  }

  public run(): Node[] {
    const processedNodes: Node[] = [];
    const explored = new Set<Node>();
    const visited = new Set<Node>();
    const frontier = new Set<Node>();

    let node = this.startNode;
    visited.add(node);

    this.initializeFrontier(frontier, node);

    while (frontier.size > 0) {
      node = this.selectRandomNode(frontier);

      if (!node.isStart() && !node.isEnd()) {
        node.setExplored();
        processedNodes.push(node.copy());
        explored.add(node);
      }

      const neighbors = this.getUnvisitedNeighbors(node, visited);

      if (neighbors.length === 1) {
        visited.add(node);
        frontier.delete(node);
        explored.delete(node);

        if (!node.isStart() && !node.isEnd()) {
          node.setEmpty();
          processedNodes.push(node.copy());
        }

        this.updateFrontier(frontier, node, visited);
      } else {
        frontier.delete(node);
      }
    }

    this.markExploredNodesAsWalls(explored, processedNodes);

    return processedNodes;
  }

  private initializeFrontier(frontier: Set<Node>, node: Node): void {
    this.graph.getEdges(node).forEach((adjacent) => frontier.add(adjacent));
  }

  private selectRandomNode(frontier: Set<Node>): Node {
    const frontierArray = Array.from(frontier);
    const randomIndex = Math.floor(Math.random() * frontierArray.length);
    return frontierArray[randomIndex];
  }

  private getUnvisitedNeighbors(node: Node, visited: Set<Node>): Node[] {
    return this.graph
      .getEdges(node)
      .filter((neighbor) => visited.has(neighbor));
  }

  private updateFrontier(
    frontier: Set<Node>,
    node: Node,
    visited: Set<Node>
  ): void {
    for (const adjacent of this.graph.getEdges(node)) {
      if (!visited.has(adjacent)) {
        frontier.add(adjacent);
      }
    }
  }

  private markExploredNodesAsWalls(
    explored: Set<Node>,
    processedNodes: Node[]
  ): void {
    for (const node of explored) {
      node.setWall();
      processedNodes.push(node.copy());
    }
  }
}
