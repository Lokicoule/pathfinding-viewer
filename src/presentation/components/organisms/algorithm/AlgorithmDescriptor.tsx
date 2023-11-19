import { PATHFINDING_ALGORITHMS } from "../../../constants/pathfindingConstants";
import { MAZE_ALGORITHMS } from "../../../constants/mazeConstants";
import { useAlgorithm } from "../../../hooks";
import Card from "../../molecules/card/Card";

export const AlgorithmDescriptor = () => {
  const { algorithm } = useAlgorithm();

  const vm = algorithm.isMazeAlgorithm()
    ? MAZE_ALGORITHMS
    : PATHFINDING_ALGORITHMS;
  const algorithmVM = vm.find((vm) => vm.type === algorithm.value);

  return (
    <Card
      isBlurred
      className="rounded-lg w-full bg-opacity-50 overflow-y-auto h-1/2"
    >
      <Card.Header className="flex flex-col space-y-4 px-4 py-5 sm:p-6 ">
        <h1 className="text-lg font-semibold text-white text-center underline uppercase">
          {algorithm.isMazeAlgorithm()
            ? "Maze Algorithm"
            : algorithm.isPathfindingAlgorithm()
            ? "Pathfinding Algorithm"
            : "Algorithm"}
        </h1>
      </Card.Header>
      <Card.Body className="flex flex-col space-y-10 px-4 py-5 sm:p-6 ">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col w-full justify-start space-y-2">
            <h1 className="text-lg font-semibold text-white text-center">
              {algorithmVM?.name}
            </h1>
            <p className="text-white text-left">{algorithmVM?.description}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
