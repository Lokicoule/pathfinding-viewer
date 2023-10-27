import { v4 as uuid } from "uuid";
import { NodeType } from "../enums/NodeType";
import { Vector } from "../valueObjects/Vector";

type NodeState = {
  type: NodeType;
  vector: Vector;
};

export class Node {
  public readonly id: string = uuid();
  private state: NodeState;

  private constructor(state: NodeState) {
    this.state = state;
  }

  public static create(state: NodeState): Node {
    return new Node(state);
  }

  public getType(): NodeType {
    return this.state.type;
  }

  public setType(type: NodeType): void {
    this.state.type = type;
  }

  public getVector(): Vector {
    return this.state.vector;
  }

  public isStart(): boolean {
    return this.state.type === NodeType.Start;
  }

  public isEnd(): boolean {
    return this.state.type === NodeType.End;
  }

  public isWall(): boolean {
    return this.state.type === NodeType.Wall;
  }

  public isEmpty(): boolean {
    return this.state.type === NodeType.Empty;
  }

  public isPath(): boolean {
    return this.state.type === NodeType.Path;
  }

  public isExplored(): boolean {
    return this.state.type === NodeType.Explored;
  }

  public isFrontier(): boolean {
    return this.state.type === NodeType.Frontier;
  }

  public isWalkable(): boolean {
    return !this.isWall();
  }

  public isTraversable(): boolean {
    return !this.isWall() && !this.isExplored();
  }
}