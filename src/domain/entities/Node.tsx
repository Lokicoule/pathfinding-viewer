export enum NodeState {
  Empty,
  Start,
  End,
  Wall,
  Path,
  Explored,
  Frontier,
}

type NodeProps = {
  state: NodeState;
  x: number;
  y: number;
};

export class Node {
  private props: NodeProps;
  private _id: string;

  private constructor(props: NodeProps) {
    this.props = props;
    this._id = `x${props.x}-y${props.y}`;
  }

  public static create(props: NodeProps): Node {
    return new Node(props);
  }

  public set state(state: NodeState) {
    this.props.state = state;
  }

  public get id(): string {
    return this._id;
  }

  public get x(): number {
    return this.props.x;
  }

  public get y(): number {
    return this.props.y;
  }

  public get isStart(): boolean {
    return this.props.state === NodeState.Start;
  }

  public get isEnd(): boolean {
    return this.props.state === NodeState.End;
  }

  public get isWall(): boolean {
    return this.props.state === NodeState.Wall;
  }

  public get isPath(): boolean {
    return this.props.state === NodeState.Path;
  }

  public get isExplored(): boolean {
    return this.props.state === NodeState.Explored;
  }

  public get isFrontier(): boolean {
    return this.props.state === NodeState.Frontier;
  }

  public get isEmpty(): boolean {
    return this.props.state === NodeState.Empty;
  }

  public get isWallable(): boolean {
    return (
      this.props.state === NodeState.Empty ||
      this.props.state === NodeState.Frontier ||
      this.props.state === NodeState.Explored ||
      this.props.state === NodeState.Path
    );
  }

  public get isTraversable(): boolean {
    return (
      this.props.state === NodeState.Empty ||
      this.props.state === NodeState.Frontier ||
      this.props.state === NodeState.Explored ||
      this.props.state === NodeState.Path
    );
  }

  public get isStartable(): boolean {
    return (
      this.props.state === NodeState.Empty ||
      this.props.state === NodeState.Frontier ||
      this.props.state === NodeState.Explored ||
      this.props.state === NodeState.Path ||
      this.props.state === NodeState.Wall
    );
  }

  public get isEndable(): boolean {
    return (
      this.props.state === NodeState.Empty ||
      this.props.state === NodeState.Frontier ||
      this.props.state === NodeState.Explored ||
      this.props.state === NodeState.Path ||
      this.props.state === NodeState.Wall
    );
  }
}
