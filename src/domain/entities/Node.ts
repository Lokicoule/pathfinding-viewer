import { v4 as uuid } from "uuid";
import { NodeType } from "../enums/NodeType";
import { Vector } from "../valueObjects/Vector";

type NodeState = {
  type: NodeType;
  vector: Vector;
};

export class Node {
  public readonly id: string;
  private state: NodeState;
  private previousNode?: Node;
  private distance: number = Infinity;

  private constructor(state: NodeState) {
    this.id = uuid();
    this.state = state;
  }

  public static create(state: NodeState): Node {
    return new Node(state);
  }

  public getType(): NodeType {
    return this.state.type;
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

  public setWall(): Node {
    this.state.type = NodeType.Wall;
    return this;
  }

  public setEmpty(): Node {
    this.state.type = NodeType.Empty;
    return this;
  }

  public isEmpty(): boolean {
    return this.state.type === NodeType.Empty;
  }

  public isPath(): boolean {
    return this.state.type === NodeType.Path;
  }

  public setPath(): void {
    this.state.type = NodeType.Path;
  }

  public isExplored(): boolean {
    return this.state.type === NodeType.Explored;
  }

  public setExplored(): Node {
    this.state.type = NodeType.Explored;
    return this;
  }

  public getPreviousNode(): Node | undefined {
    return this.previousNode;
  }

  public setPreviousNode(previousNode: Node | undefined): void {
    this.previousNode = previousNode;
  }

  public getDistance(): number {
    return this.distance;
  }

  public setDistance(distance: number): void {
    this.distance = distance;
  }

  public setStart(): Node {
    this.state.type = NodeType.Start;
    return this;
  }

  public equals(node: Node): boolean {
    return this.id === node.id;
  }

  public copy(): Node {
    return Node.create({
      type: this.state.type,
      vector: this.state.vector,
    });
  }
}
