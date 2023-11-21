import { v4 as uuid } from "uuid";
import { NodeType } from "../types/NodeType";
import { Vector } from "../valueObjects/Vector";

type NodeState = {
  type: NodeType;
  vector: Vector;
  previousType?: NodeType;
};

export class Node {
  public readonly id: string;
  private state: NodeState;
  private previousNode?: Node;
  private distance: number = Infinity;
  private g: number = Infinity;
  private h: number = 0;

  private constructor(state: NodeState, id: string = uuid()) {
    this.id = id;
    this.state = {
      ...state,
      previousType: state.previousType ?? "Empty",
    };
  }

  public static create(state: NodeState, id?: string): Node {
    return new Node(state, id);
  }

  public setType(type: NodeType): Node {
    this.state = { ...this.state, type };
    return this;
  }

  public setNodeType(type: NodeType): Node {
    this.state = { ...this.state, previousType: this.state.type, type };
    return this;
  }

  public setPreviousNode(previousNode: Node | undefined): Node {
    this.previousNode = previousNode;
    return this;
  }

  public setDistance(distance: number): Node {
    this.distance = distance;
    return this;
  }

  public setG(value: number): Node {
    this.g = value;
    return this;
  }

  public setH(value: number): Node {
    this.h = value;
    return this;
  }

  public copy(): Node {
    const node = Node.create(
      {
        ...this.state,
      },
      this.id
    );

    node.setG(this.g);
    node.setH(this.h);

    return node;
  }

  public getType(): NodeType {
    return this.state.type;
  }

  public getVector(): Vector {
    return this.state.vector;
  }

  public getPreviousType(): NodeType {
    return this.state.previousType!;
  }

  public getPreviousNode(): Node | undefined {
    return this.previousNode;
  }

  public getDistance(): number {
    return this.distance;
  }

  public getG(): number {
    return this.g;
  }

  public getH(): number {
    return this.h;
  }

  public getTotalCost(): number {
    return this.g + this.h;
  }

  public isType(type: NodeType): boolean {
    return this.state.type === type;
  }

  public isNotType(...types: NodeType[]): boolean {
    return !types.includes(this.state.type);
  }

  public isOneOf(...types: NodeType[]): boolean {
    return types.includes(this.state.type);
  }

  public equals(node: Node): boolean {
    return this.id === node.id;
  }

  public equalsVector(vector: Vector): boolean {
    return Vector.equals(this.state.vector, vector);
  }
}
