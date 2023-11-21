import { v4 as uuid } from "uuid";
import { NodeType } from "../enums/NodeType";
import { Vector } from "../valueObjects/Vector";

type NodeState = {
  type: NodeType;
  vector: Vector;
  previousType?: NodeType;
};

export class Node {
  public readonly id: string;
  private state: NodeState;
  private previousType: NodeType;
  private previousNode?: Node;
  private distance: number = Infinity;
  private g: number = Infinity;
  private h: number = 0;

  private constructor(state: NodeState, id: string = uuid()) {
    this.id = id;
    this.state = state;
    this.previousType = state.previousType ?? NodeType.Empty;
  }

  public static create(state: NodeState, id?: string): Node {
    return new Node(state, id);
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

  public isHighlighted(): boolean {
    return this.state.type === NodeType.Highlighted;
  }

  public isWall(): boolean {
    return this.state.type === NodeType.Wall;
  }

  public setWall(): Node {
    this.previousType = this.state.type;

    this.state.type = NodeType.Wall;
    return this;
  }

  public setEmpty(): Node {
    this.previousType = this.state.type;

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
    this.previousType = this.state.type;

    this.state.type = NodeType.Path;
  }

  public isExplored(): boolean {
    return this.state.type === NodeType.Explored;
  }

  public setExplored(): Node {
    this.previousType = this.state.type;

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
    this.previousType = this.state.type;

    this.state.type = NodeType.Start;
    return this;
  }

  public getPreviousType(): NodeType {
    return this.previousType;
  }

  public equals(node: Node): boolean {
    return this.id === node.id;
  }

  public getG(): number {
    return this.g;
  }

  public setG(value: number): void {
    this.g = value;
  }

  public getH(): number {
    return this.h;
  }

  public setH(value: number): void {
    this.h = value;
  }

  public getTotalCost(): number {
    return this.g + this.h;
  }

  public copy(): Node {
    const node = Node.create(
      {
        type: this.state.type,
        vector: this.state.vector,
        previousType: this.previousType,
      },
      this.id
    );

    node.setG(this.g);
    node.setH(this.h);

    return node;
  }
}
