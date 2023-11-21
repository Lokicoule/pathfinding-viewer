import { useRef } from "react";

import { Card } from "@ui/components/ui";
import { useDisableRightClick } from "@ui/hooks";
import { GridControls, GridLegend, NodeGrid } from "../organisms";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  const ref = useRef(null);
  useDisableRightClick(ref);

  return (
    <Card isBlurred className="rounded-lg h-full w-full px-0 overflow-y-auto">
      <Card.Body className="flex flex-col px-4 py-4 overflow-y-auto">
        <GridControls />
        <div ref={ref}>
          <NodeGrid />
        </div>
        <GridLegend className="justify-end mt-4" />
      </Card.Body>
    </Card>
  );
};

export default Environment;
