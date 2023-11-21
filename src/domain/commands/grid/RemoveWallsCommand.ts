import { Node } from "@/domain/entities";
import { Command } from "@domain/interfaces/Command";

export class RemoveWallsCommand extends Command {
  constructor(public readonly nodes: Node[]) {
    super("RemoveWallsCommand");
  }
}
