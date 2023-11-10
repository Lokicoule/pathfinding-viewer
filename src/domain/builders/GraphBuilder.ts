import { Graph } from "../entities/Graph";
import { Node } from "../entities/Node";

export class GraphBuilder {
  static build(nodes: Node[][]): Graph<Node> {
    const graph = new Graph<Node>();

    this.addVertexToGraph(graph, nodes);
    this.addEdgesToGraph(graph, nodes);

    return graph;
  }

  private static addVertexToGraph(graph: Graph<Node>, nodes: Node[][]): void {
    nodes.flat().forEach((node) => graph.addVertex(node));
  }

  private static addEdgesToGraph(
    graph: Graph<Node>,
    nodes: Node[][]
  ): Graph<Node> {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].length; j++) {
        if (j < nodes[i].length - 1) {
          graph.addEdge(nodes[i][j], nodes[i][j + 1]);
        }
        if (i < nodes.length - 1) {
          graph.addEdge(nodes[i][j], nodes[i + 1][j]);
        }
        if (j > 0) {
          graph.addEdge(nodes[i][j], nodes[i][j - 1]);
        }
        if (i > 0) {
          graph.addEdge(nodes[i][j], nodes[i - 1][j]);
        }
      }
    }

    return graph;
  }
}
