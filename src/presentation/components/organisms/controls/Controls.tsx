import { ClearPathAndExploredNodesCommand } from "../../../../domain/commands/ClearPathAndExploredNodesCommand";
import { ClearWallsCommand } from "../../../../domain/commands/ClearWallsCommand";
import { ResetGridCommand } from "../../../../domain/commands/ResetGridCommand";

import { useCommand } from "../../../adapters/mediator/hooks/useCommand";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { concat } from "../../../utils/string";
import Button from "../../atoms/button/Button";

type ControlsComponent = React.FC<React.HTMLAttributes<HTMLDivElement>>;

const Controls: ControlsComponent = ({ className, ...props }) => {
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
    <div className={concat("flex flex-col gap-2", className)} {...props}>
      <span className="text-lg font-semibold">Controls</span>
      <div className="flex flex-row">
        <Button
          className="bg-gradient-to-r from-rose-100 to-[#f3e9e9]"
          disabled={isAlgorithmRunning}
          variant="underline"
          onClick={() => resetActionMediator("RESET_GRID")}
        >
          Reset Grid
        </Button>
        <Button
          className="bg-gradient-to-r from-[#f3e9e9] to-[#e7efeb]"
          variant="underline"
          disabled={isAlgorithmRunning}
          onClick={() => resetActionMediator("CLEAR_WALLS")}
        >
          Clear Walls
        </Button>
        <Button
          className="bg-gradient-to-r from-[#e7efeb] to-teal-100"
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

export default Controls;
