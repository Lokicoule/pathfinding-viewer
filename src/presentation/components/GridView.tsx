import { Node } from "../../domain/entities/Node";

type GridViewProps = {
  nodes: Node[][];
  nodeSize: number;
};

type GridComponent = React.FC<GridViewProps>;

const GridView: GridComponent = ({ nodes, nodeSize }) => {
  console.log(nodes);

  return (
    <div className="grid">
      {nodes.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((node) => (
            <div
              key={node.id}
              className={`cell ${node.isStart ? "start" : ""} ${
                node.isEnd ? "end" : ""
              } ${node.isWall ? "wall" : ""}`}
              style={{
                width: `${nodeSize}px`,
                height: `${nodeSize}px`,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridView;
