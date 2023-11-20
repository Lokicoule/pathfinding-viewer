import Card from "../molecules/card/Card";
import GridControls from "../organisms/grid/GridControls";
import { Legend } from "../organisms/grid/GridLegend";
import NodeGrid from "../organisms/grid/NodeGrid";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  return (
    <Card isBlurred className="rounded-lg h-full w-full px-0 overflow-y-auto">
      <Card.Body className="flex flex-col px-4 py-4 overflow-y-auto">
        <GridControls />
        <NodeGrid />
        <Legend className="justify-end mt-4" />
      </Card.Body>
    </Card>
  );
};

export default Environment;
