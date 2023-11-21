import { NodeInteractionCommand } from "@domain/commands/NodeInteractionCommand";
import { Node } from "@domain/entities/Node";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useGrid } from "../../../hooks/useGrid";

import { createContext, useState } from "react";
import { NodeCell } from "../molecules";

type NodeGridComponent = React.FC;

export const BatchedNodesContext = createContext(new Map<string, Node>());

const NodeGrid: NodeGridComponent = () => {
  const grid = useGrid();
  const [isPressed, setIsPressed] = useState(false);
  const [batchedNodesMap, setBatchedNodesMap] = useState(
    new Map<string, Node>()
  );

  const sendCommand = useCommand();

  const handleNodeClick = (node: Node) => {
    sendCommand(new NodeInteractionCommand(node));
  };

  const toggleNodeInBatch = (node: Node) => {
    setBatchedNodesMap((prevMap) => {
      const updatedMap = new Map(prevMap);

      if (!updatedMap.has(node.id)) {
        updatedMap.set(node.id, node);
      } else {
        updatedMap.delete(node.id);
      }

      return updatedMap;
    });
  };

  const handleMouseDown = (node: Node) => {
    setIsPressed(true);
    toggleNodeInBatch(node);
  };

  const handleMouseEnter = (node: Node) => {
    if (isPressed) {
      toggleNodeInBatch(node);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    batchedNodesMap.forEach((batchedNode) => handleNodeClick(batchedNode));
    setBatchedNodesMap(new Map());
  };

  return (
    <div className="my-4">
      {grid.nodes.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((node) => (
            <NodeCell
              key={node.id}
              node={node}
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
