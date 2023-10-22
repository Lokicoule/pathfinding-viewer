import { SelectedNodeType } from "../enums/SelectedNodeType";
import { Command } from "../interfaces/Command";

export class SetSelectedNodeTypeCommand implements Command {
  public readonly type = SetSelectedNodeTypeCommand.name;

  constructor(public readonly nodeType: SelectedNodeType) {}
}
