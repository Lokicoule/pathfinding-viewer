import { SelectedNodeType } from "../../domain/enums/SelectedNodeType";
import Store from "../../infrastructure/store/Store";

type ExperienceStoreState = {
  selectedNodeType: SelectedNodeType;
};

export class ExperienceStore extends Store<ExperienceStoreState> {
  constructor() {
    super({
      selectedNodeType: SelectedNodeType.Wall,
    });
  }

  public getSelectedNodeType(): SelectedNodeType {
    return this.state.selectedNodeType;
  }

  public setSelectedNodeType(selectedNodeType: SelectedNodeType): void {
    this.state.selectedNodeType = selectedNodeType;
  }
}
