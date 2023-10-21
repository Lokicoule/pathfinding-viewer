import { Node, NodeState } from "./Node";

type GridProps = {
  rows: number;
  cols: number;
};

type GridState = {
  grid: Node[][];
  props: GridProps;
};

export class Grid {
  private state: GridState;

  private constructor(props: GridProps) {
    this.state = {
      grid: this.initialize(props),
      props,
    };
  }

  public static create(props: GridProps): Grid {
    return new Grid(props);
  }

  public getNodes(): Node[][] {
    return this.state.grid;
  }

  public getNode(row: number, col: number): Node {
    return this.state.grid[row][col];
  }

  public reset(): void {
    this.state.grid = this.initialize(this.state.props);
  }

  public updateNode(Node: Node): void {
    const { grid } = this.state;

    const row = grid[Node.y];
    const col = row[Node.x];

    col.state = Node.state;

    this.state.grid = grid;
  }

  private initialize(props: GridProps): Node[][] {
    const { rows, cols } = props;

    const grid: Node[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: Node[] = [];
      for (let j = 0; j < cols; j++) {
        const node = Node.create({
          state: NodeState.Empty,
          x: j,
          y: i,
        });
        row.push(node);
      }
      grid.push(row);
    }

    grid[2][2].state = NodeState.Start;
    grid[2][4].state = NodeState.End;
    grid[2][6].state = NodeState.Wall;
    grid[2][8].state = NodeState.Explored;
    grid[2][10].state = NodeState.Frontier;
    grid[2][12].state = NodeState.Path;

    return grid;
  }
}
