import { Node } from "../entities/Node";
import { Command } from "../interfaces/Command";

export class NodeInteractionCommand implements Command {
  public readonly type = NodeInteractionCommand.name;
  constructor(public readonly node: Node) {}
}
