import { useIsEnvironmentLocked } from "@/presentation/hooks/useIsEnvironmentLocked";
import {
  ClearPathAndExploredNodesCommand,
  ClearWallsCommand,
  ResetGridCommand,
} from "@domain/environment";
import { useCommand } from "@ui/adapters/mediator/hooks/useCommand";
import { AnimationControls } from "@ui/components/animation";
import { Button } from "@ui/components/ui";

type GridControlsComponent = React.FC;

const GridControls: GridControlsComponent = () => {
  const sendCommand = useCommand();
  const { isEnvironmentLocked } = useIsEnvironmentLocked();

  const resetActionMediator = (action: string) => {
    switch (action) {
      case "RESET_GRID":
        sendCommand(new ResetGridCommand());
        break;
      case "CLEAR_WALLS":
        sendCommand(new ClearWallsCommand());
        break;
      case "CLEAR_PATHFINDING_AND_EXPLORED_NODES":
        sendCommand(new ClearPathAndExploredNodesCommand());
        break;
    }
  };

  return (
    <div className="flex flex-row justify-between items-center my-4">
      <AnimationControls />

      <div className="flex flex-row">
        <Button
          variant="underline"
          className="bg-gradient-to-r from-rose-100 to-[#f3e9e9] disabled:cursor-not-allowed"
          disabled={isEnvironmentLocked}
          onClick={() => resetActionMediator("RESET_GRID")}
        >
          Reset Grid
        </Button>
        <Button
          variant="underline"
          className="bg-gradient-to-r from-[#f3e9e9] to-[#e7efeb] disabled:cursor-not-allowed hidden lg:block "
          disabled={isEnvironmentLocked}
          onClick={() => resetActionMediator("CLEAR_WALLS")}
        >
          Clear Walls
        </Button>
        <Button
          variant="underline"
          className="bg-gradient-to-r from-[#e7efeb] to-teal-100 disabled:cursor-not-allowed hidden lg:block"
          disabled={isEnvironmentLocked}
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
