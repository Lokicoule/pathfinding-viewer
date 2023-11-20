import { ClearPathAndExploredNodesCommand } from "../../../../domain/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "../../../../domain/commands/ClearWallsCommand";
import { ResetGridCommand } from "../../../../domain/commands/ResetGridCommand";

import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import Button from "../../atoms/button/Button";
import AnimationControls from "../animation/AnimationControls";

type GridControlsComponent = React.FC;

const GridControls: GridControlsComponent = () => {
  const sendCommand = useCommand();
  const { isAlgorithmRunning } = useAlgorithm();

  const resetActionMediator = (action: string) => {
    switch (action) {
      case "RESET_GRID":
        sendCommand(ResetGridCommand.name, new ResetGridCommand());
        break;
      case "CLEAR_WALLS":
        sendCommand(ClearWallsCommand.name, new ClearWallsCommand());
        break;
      case "CLEAR_PATHFINDING_AND_EXPLORED_NODES":
        sendCommand(
          ClearPathAndExploredNodesCommand.name,
          new ClearPathAndExploredNodesCommand()
        );
        break;
    }
  };

  return (
    <div className="flex flex-row justify-between items-center my-4">
      <AnimationControls />

      <div className="flex flex-row">
        <Button
          className="bg-gradient-to-r from-rose-100 to-[#f3e9e9] text-white text-sm text-white font-primary disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed"
          disabled={isAlgorithmRunning}
          variant="underline"
          onClick={() => resetActionMediator("RESET_GRID")}
        >
          Reset Grid
        </Button>
        <Button
          className="bg-gradient-to-r from-[#f3e9e9] to-[#e7efeb] text-white text-sm text-white font-primary disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed hidden lg:block "
          variant="underline"
          disabled={isAlgorithmRunning}
          onClick={() => resetActionMediator("CLEAR_WALLS")}
        >
          Clear Walls
        </Button>
        <Button
          className="bg-gradient-to-r from-[#e7efeb] to-teal-100 text-white text-sm text-white font-primary disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed hidden lg:block"
          variant="underline"
          disabled={isAlgorithmRunning}
          onClick={() =>
            resetActionMediator("CLEAR_PATHFINDING_AND_EXPLORED_NODES")
          }
        >
          Clear Path and Explored Nodes
        </Button>
      </div>
    </div>
  );
};

export default GridControls;
