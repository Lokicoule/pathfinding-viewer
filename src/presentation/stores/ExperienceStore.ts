import { Mediator } from "../../application/mediator/Mediator";
import { SelectedNodeType } from "../../domain/enums/SelectedNodeType";
import Store from "../store/Store";

type ExperienceStoreState = {
  selectedNodeType: SelectedNodeType;
};

export class ExperienceStore extends Store<ExperienceStoreState> {
  constructor(mediator: Mediator) {
    super(mediator, "experienceStateUpdated", {
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
