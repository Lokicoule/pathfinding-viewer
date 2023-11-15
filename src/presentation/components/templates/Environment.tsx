import Card from "../molecules/card/Card";
import Algorithm from "../organisms/algorithm/Algorithm";
import AnimationPlayer from "../organisms/animation/AnimationPlayer";
import Maze from "../organisms/controls/Maze";
import Pathfinding from "../organisms/controls/Pathfinding";
import SpeedControl from "../organisms/controls/SpeedControl";
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
          </div>
          <GridControls />
        </div>
      </Card.Header>
      <Card.Body>
        <div className="flex justify-between items-center">
          <SpeedControl />
          <AnimationPlayer />
          <Legend />
        </div>
        <NodeGrid />
      </Card.Body>
      <Card.Footer>
        <Algorithm />
      </Card.Footer>
    </Card>
  );
};

export default Environment;
