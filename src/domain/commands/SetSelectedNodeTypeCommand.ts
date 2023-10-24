import { SelectedNodeType } from "../enums/SelectedNodeType";
import { Command } from "../interfaces/Command";

export class SetSelectedNodeTypeCommand extends Command {
  constructor(public readonly nodeType: SelectedNodeType) {
    super("SetSelectedNodeTypeCommand");
  }
}
