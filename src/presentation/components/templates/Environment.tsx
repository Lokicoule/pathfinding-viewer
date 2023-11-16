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
    <Card isBlurred className="border-none h-full w-full">
      <Card.Header>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center space-x-10">
              <Maze />
              <Pathfinding />
            </div>
            <div>Description</div>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="space-y-4">
        <div className="flex justify-between items-center">
          <GridControls />
          <AnimationControls />
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
