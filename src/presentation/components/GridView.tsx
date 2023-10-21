import { AddWallCommand } from "../../domain/commands/AddWallCommand";
import { useCommand } from "../../infrastructure/mediator/react";
import { useGridStore } from "../../infrastructure/stores/react/hooks/useGridStore";
import { NODE_PIXEL_SIZE } from "../../shared/constants";

type GridComponent = React.FC;

const GridView: GridComponent = () => {
  const grid = useGridStore();
  const sendAddWallCommand = useCommand(AddWallCommand.name);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node) => (
            <div
              key={node.id}
              className={`cell ${node.isStart() ? "start" : ""} ${
                node.isEnd() ? "end" : ""
              } ${node.isWall() ? "wall" : ""}`}
              style={{
                width: `${NODE_PIXEL_SIZE}px`,
                height: `${NODE_PIXEL_SIZE}px`,
              }}
              onClick={() =>
                sendAddWallCommand(new AddWallCommand(node.getX(), node.getY()))
              }
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
