import { SelectedNodeType } from "../../domain/enums/SelectedNodeType";

export class ExperienceStore {
  private selectedNodeType: SelectedNodeType;

  constructor() {
    this.selectedNodeType = SelectedNodeType.Wall;
  }

  public getSelectedNodeType(): SelectedNodeType {
    return this.selectedNodeType;
  }

  public setSelectedNodeType(selectedNodeType: SelectedNodeType): void {
    this.selectedNodeType = selectedNodeType;
  }
}
