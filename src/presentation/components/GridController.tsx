import { ClearPathAndExploredNodesCommand } from "../../domain/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "../../domain/commands/ClearWallsCommand";
import { ResetGridCommand } from "../../domain/commands/ResetGridCommand";

import { useCommand } from "../adapters/mediator/hooks/useCommand";
import { useAlgorithmIsRunning } from "../hooks/useAlgorithmIsRunning";

type GridControllerComponent = React.FC;

const GridController: GridControllerComponent = () => {
  const sendCommand = useCommand();
  const isAlgorithmRunning = useAlgorithmIsRunning();

  const resetActionMediator = (action: string) => {
    switch (action) {
      case "RESET_GRID":
        sendCommand(ResetGridCommand.name, new ResetGridCommand());
        break;
      case "CLEAR_WALLS":
        sendCommand(ClearWallsCommand.name, new ClearWallsCommand());
        break;
      case "CLEAR_PATH_AND_EXPLORED_NODES":
        sendCommand(
          ClearPathAndExploredNodesCommand.name,
          new ClearPathAndExploredNodesCommand()
        );
        break;
    }
  };

  return (
    <div className="flex flex-row justify-evenly w-full">
      <button
        onClick={() => resetActionMediator("RESET_GRID")}
        color="foreground"
      >
        Reset Grid
      </button>
      <button
        disabled={isAlgorithmRunning}
        onClick={() => resetActionMediator("CLEAR_WALLS")}
      >
        Clear Walls
      </button>
      <button
        disabled={isAlgorithmRunning}
        onClick={() => resetActionMediator("CLEAR_PATH_AND_EXPLORED_NODES")}
      >
        Clear Path and Explored Nodes
      </button>
    </div>
  );
};

export default GridController;
