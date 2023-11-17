import Card from "../molecules/card/Card";
import Algorithm from "../organisms/algorithm/Algorithm";
import AnimationControls from "../organisms/animation/AnimationControls";
import Maze from "../organisms/animation/Maze";
import Pathfinding from "../organisms/animation/Pathfinding";
import GridControls from "../organisms/grid/GridControls";
import { Legend } from "../organisms/grid/GridLegend";
import NodeGrid from "../organisms/grid/NodeGrid";

type EnvironmentComponent = React.FC;

const Environment: EnvironmentComponent = () => {
  return (
    <Card isBlurred className="rounded-b-lg">
      <Card.Body className="space-y-4 flex flex-col">
        <div className="flex justify-between items-center flex-wrap">
          <Maze />
          <Pathfinding />
          <AnimationControls />
          <GridControls />
        </div>
        <NodeGrid />
        <Legend />
      </Card.Body>
      <Card.Footer className="flex flex-col justify-center items-center space-y-4">
        <Algorithm />
      </Card.Footer>
    </Card>
  );
};

export default Environment;
