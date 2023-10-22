import { AddWallCommand } from "../../domain/commands/AddWallCommand";
import { RemoveWallCommand } from "../../domain/commands/RemoveWallCommand";
import { SetEndNodeCommand } from "../../domain/commands/SetEndNodeCommand";
import { SetStartNodeCommand } from "../../domain/commands/SetStartNodeCommand";
import { useCommand } from "../../infrastructure/mediator/react";
import { useGridStore } from "../../infrastructure/stores/react/hooks/useGridStore";
import { NODE_PIXEL_SIZE } from "../../shared/constants";
import { concatClassNames } from "../utils/concatClassNames";

type GridComponent = React.FC;

const GridView: GridComponent = () => {
  const grid = useGridStore();
  const sendAddWallCommand = useCommand(AddWallCommand.name);
  const sendRemoveWallCommand = useCommand(RemoveWallCommand.name);
  const sendSetStartNodeCommand = useCommand(SetStartNodeCommand.name);
  const sendSetEndNodeCommand = useCommand(SetEndNodeCommand.name);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node) => (
            <div
              key={node.id}
              className={concatClassNames(
                "cell",
                node.isStart() ? "start" : undefined,
                node.isEnd() ? "end" : undefined,
                node.isWall() ? "wall" : undefined
              )}
              style={{
                width: `${NODE_PIXEL_SIZE}px`,
                height: `${NODE_PIXEL_SIZE}px`,
              }}
              onClick={() =>
                /* sendSetEndNodeCommand(
                    new SetEndNodeCommand(node.getX(), node.getY())
                  ) */
                /* sendSetStartNodeCommand(
                    new SetStartNodeCommand(node.getX(), node.getY())
                  ) */
                //sendAddWallCommand(new AddWallCommand(node.getX(), node.getY()))
                sendRemoveWallCommand(
                  new RemoveWallCommand(node.getX(), node.getY())
                )
              }
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
