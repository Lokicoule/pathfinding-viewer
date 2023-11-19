import { useCallback } from "react";
import { NodeInteractionCommand } from "../../../../domain/commands/NodeInteractionCommand";
import { Node } from "../../../../domain/entities/Node";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useGrid } from "../../../hooks/useGrid";
import useStateMap from "../../../hooks/useStateMap";
import NodeCell from "../../molecules/cell/NodeCell";

type NodeGridComponent = React.FC;

const NodeGrid: NodeGridComponent = () => {
  const grid = useGrid();
  const { isAlgorithmRunning } = useAlgorithm();

  const sendCommand = useCommand();
  const nodes = useStateMap<string, Node>();

  const handleNodeClick = useCallback((node: Node) => {
    sendCommand(NodeInteractionCommand.name, new NodeInteractionCommand(node));
  }, []);

  const handleMouseDown = useCallback((node: Node) => {
    nodes.addEntry(node.id, node);
  }, []);

  const handleMouseEnter = useCallback((node: Node) => {
    console.log(nodes.Map.size);
    if (nodes.Map.size > 0 && !nodes.Map.has(node.id)) {
      nodes.addEntry(node.id, node);
    } else if (nodes.Map.size > 0 && nodes.Map.has(node.id)) {
      nodes.deleteEntry(node.id);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    Array.from(nodes.Map.values()).forEach((node) => {
      sendCommand(
        NodeInteractionCommand.name,
        new NodeInteractionCommand(node)
      );
    });
    nodes.clearMap();
  }, []);

  return (
    <div className="my-4">
      {grid.nodes.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((node) => (
            <NodeCell
              key={node.id}
              node={node}
              isAlgorithmRunning={isAlgorithmRunning}
              isSelected={nodes.Map.has(node.id)}
              handleNodeClick={handleNodeClick}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default NodeGrid;
