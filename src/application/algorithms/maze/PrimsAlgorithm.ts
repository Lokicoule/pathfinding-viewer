import { Graph } from "../../../domain/entities/Graph";
import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class PrimsAlgorithm implements Algorithm {
  private readonly graph: Graph<Node>;
  private readonly startNode: Node;
  private readonly walls: Node[] = [];

  private constructor(graph: Graph<Node>, startNode: Node, walls: Node[] = []) {
    this.graph = graph;
    this.startNode = startNode;
    this.walls = walls;
  }

  public static create(nodes: Node[][], startNode: Node): Algorithm {
    const graph = this.createGraphFromNodes(nodes);
    return new PrimsAlgorithm(graph, startNode);
  }

  private static createGraphFromNodes(nodes: Node[][]): Graph<Node> {
    const graph = new Graph<Node>();

    for (const row of nodes) {
      for (const node of row) {
        graph.addVertex(node);
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        if (j < nodes[i].length - 1) {
          graph.addEdge(nodes[i][j], nodes[i][j + 1]);
        }
        if (i < nodes.length - 1) {
          graph.addEdge(nodes[i][j], nodes[i + 1][j]);
        }
      }
    }

    return graph;
  }

  public run(): Node[] {
    const openNodes: Node[] = [this.startNode];

    while (openNodes.length) {
      const currentNode = this.chooseRandomNode(openNodes);
      const neighbors = this.getNeighbors(currentNode);

      if (neighbors.length === 0) {
        this.removeNode(openNodes, currentNode);
      } else {
        const randomNeighbor = this.chooseRandomNode(neighbors);
        openNodes.push(randomNeighbor);

        if (neighbors.length === 1) {
          this.removeNode(openNodes, currentNode);
        }

        this.updateWalls(randomNeighbor);
      }
    }

    return this.walls;
  }

  private getNeighbors(node: Node): Node[] {
    return this.graph
      .getEdges(node)
      .map((vertex) => this.graph.getVertex(vertex).value)
      .filter((neighbor) => neighbor.isWall());
  }

  private chooseRandomNode(nodes: Node[]): Node {
    const index = Math.floor(Math.random() * nodes.length);
    return nodes[index];
  }

  private updateWalls(randomNeighbor: Node): void {
    randomNeighbor.setExplored();
    this.walls.push(randomNeighbor.copy());

    const connectingNode = this.graph.getVertex(
      this.graph.getEdges(randomNeighbor)[0]
    ).value;

    if (!connectingNode.isStart() && !connectingNode.isEnd()) {
      connectingNode.setEmpty();
      this.walls.push(connectingNode.copy());
    }

    this.walls.push(
      Node.create({
        type: NodeType.Wall,
        vector: randomNeighbor.getVector(),
      })
    );
  }

  private removeNode(nodes: Node[], node: Node): void {
    const index = nodes.indexOf(node);

    if (index !== -1) {
      nodes.splice(index, 1);
    }
  }
}
