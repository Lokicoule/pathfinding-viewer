import { EnvironmentController } from "./EnvironmentController";

import { Cell } from "../../domain/entities/Cell";

type GridViewProps = {
  controller: EnvironmentController;
  cells: Cell[][];
  cellSize: number;
};

type GridComponent = React.FC<GridViewProps>;

const GridView: GridComponent = ({ controller, cells, cellSize }) => {
  return (
    <div className="grid">
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell.isStart ? "start" : ""} ${
                cell.isEnd ? "end" : ""
              } ${cell.isWall ? "wall" : ""}`}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
              onClick={() => controller.handleCellChange(cell)}
            >
              {cell.state ? "X" : "Y"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
