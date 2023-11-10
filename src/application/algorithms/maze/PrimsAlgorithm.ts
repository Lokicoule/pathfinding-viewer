import { Node } from "../../../domain/entities/Node";
import { NodeType } from "../../../domain/enums/NodeType";
import { Algorithm } from "../../../domain/interfaces/Algorithm";

export class PrimsAlgorithm implements Algorithm {
  private constructor(
    private readonly grid: Node[][],
    private readonly startNode: Node
  ) {}

  public static create(grid: Node[][], startNode: Node): Algorithm {
    return new PrimsAlgorithm(grid, startNode);
  }

  public run(): Node[] {
    const walls: Node[] = this.initializeWalls();
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

        this.updateWalls(randomNeighbor, currentNode, walls);
      }
    }

    return walls;
  }

  private initializeWalls(): Node[] {
    const walls: Node[] = [];

    for (const row of this.grid) {
      for (const node of row) {
        if (!node.isStart() && !node.isEnd()) {
          node.setWall();
          walls.push(
            Node.create({
              type: NodeType.Wall,
              vector: node.getVector(),
            })
          );
        }
      }
    }

    return walls;
  }

  private getNeighbors(node: Node): Node[] {
    const neighbors: Node[] = [];
    const { x, y } = node.getVector();

    if (y > 0) neighbors.push(this.grid[y - 1][x]);
    if (y < this.grid.length - 1) neighbors.push(this.grid[y + 1][x]);
    if (x > 0) neighbors.push(this.grid[y][x - 1]);
    if (x < this.grid[0].length - 1) neighbors.push(this.grid[y][x + 1]);

    return neighbors.filter((neighbor) => neighbor.isWall());
  }

  private chooseRandomNode<Node>(nodes: Node[]): Node {
    const index = Math.floor(Math.random() * nodes.length);
    return nodes[index];
  }

  private updateWalls(
    randomNeighbor: Node,
    currentNode: Node,
    walls: Node[]
  ): void {
    randomNeighbor.setExplored();
    walls.push(
      Node.create({
        type: NodeType.Explored,
        vector: randomNeighbor.getVector(),
      })
    );
    walls.push(
      Node.create({ type: NodeType.Wall, vector: randomNeighbor.getVector() })
    );

    const connectingNode =
      this.grid[
        Math.floor(
          (randomNeighbor.getVector().y + currentNode.getVector().y) / 2
        )
      ][
        Math.floor(
          (randomNeighbor.getVector().x + currentNode.getVector().x) / 2
        )
      ];

    if (!connectingNode.isStart() && !connectingNode.isEnd()) {
      walls.push(
        Node.create({
          type: NodeType.Empty,
          vector: connectingNode.getVector(),
        })
      );
      connectingNode.setEmpty();
    }
  }

  private removeNode(nodes: Node[], node: Node): void {
    const index = nodes.indexOf(node);

    if (index !== -1) {
      nodes.splice(index, 1);
    }
  }
}
