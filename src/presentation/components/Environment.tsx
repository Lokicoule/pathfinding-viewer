import { useEffect, useState } from "react";
import { EnvironmentController } from "./EnvironmentController";
import { EnvironmentPresenter } from "./EnvironmentPresenter";
import { EnvironmentViewModel } from "./EnvironmentViewModel";

import "./Environment.css";
import GridView from "./GridView";

type EnvironmentProps = {
  controller: EnvironmentController;
  presenter: EnvironmentPresenter;
};

type EnvironmentComponent = React.FC<EnvironmentProps>;

const Environment: EnvironmentComponent = ({ controller, presenter }) => {
  const [viewModel, setViewModel] = useState<
    EnvironmentViewModel | undefined
  >();

  useEffect(() => {
    presenter.load((vm) => setViewModel(vm));
  }, [presenter]);

  if (!viewModel) {
    return null;
  }

  return (
    <div>
      <GridView
        controller={controller}
        cells={viewModel.grid.getCells()}
        cellSize={viewModel.cellSize}
      />
      <div>
        <button onClick={() => controller.handleMenuReset()}>Reset</button>
      </div>
    </div>
  );
};

export default Environment;
