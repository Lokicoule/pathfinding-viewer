import { useGridStore } from "../../infrastructure/stores/react/hooks/useGridStore";

type GridComponent = React.FC;

const GridView: GridComponent = () => {
  const grid = useGridStore();

  return (
    <div className="grid">
      {grid.getGrid().map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node, idx) => (
            <div
              key={idx}
              className={`cell ${node.isStart() ? "start" : ""} ${
                node.isEnd() ? "end" : ""
              } ${node.isWall() ? "wall" : ""}`}
              style={{
                width: `${grid.getSize()}px`,
                height: `${grid.getSize()}px`,
                backgroundColor: "white",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
