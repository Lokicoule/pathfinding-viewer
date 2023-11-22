import { Card, LinkIcon } from "@ui/components/ui";
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
      <Card.Header className="flex justify-center px-4 py-5 sm:p-6">
        <h1 className="text-lg font-semibold text-white text-center font-primary">
          {algorithmVM?.name}
        </h1>
      </Card.Header>
      <Card.Body className="flex flex-col space-y-5 px-6 pb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col w-full justify-start space-y-6">
            <p className="text-white text-justify">
              {algorithmVM?.description}
            </p>
            <a
              href={`${algorithmVM?.source}`}
              target="_blank"
              className="text-xs text-white visited:text-neutral-200"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Learn more
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AlgorithmDescriptor;
