import { Card } from "@ui/components/ui";
import { MAZE_ALGORITHMS } from "@ui/constants/mazeConstants";
import { PATHFINDING_ALGORITHMS } from "@ui/constants/pathfindingConstants";
import { useAlgorithm } from "@ui/hooks";

const AlgorithmDescriptor = () => {
  const { algorithm } = useAlgorithm();

  const vm = algorithm.isMazeAlgorithm()
    ? MAZE_ALGORITHMS
    : PATHFINDING_ALGORITHMS;
  const algorithmVM = vm.find((vm) => vm.type === algorithm.value);

  return (
    <Card
      isBlurred
      className="rounded-lg w-full bg-opacity-20 overflow-y-auto bg-[#184d67]"
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

export default AlgorithmDescriptor;
