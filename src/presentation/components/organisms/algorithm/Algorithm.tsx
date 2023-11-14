import { ALGORITHMS } from "../../../constants/algorithmConstants";
import { useAlgorithm } from "../../../hooks/useAlgorithm";

type AlgorithmComponent = React.FC;

const Algorithm: AlgorithmComponent = () => {
  const { algorithm, isAlgorithmRunning } = useAlgorithm();

  return (
    <div className="flex justify-between w-full text-white">
      <div className="flex justify-start gap-2">
        <p className="font-bold">Algorithm: </p>
        {algorithm ? (
          <p className="font-bold">{ALGORITHMS.get(algorithm)}</p>
        ) : null}
      </div>
      <div className="flex justify-start gap-2 font-bold">
        <p>Edition Mode: </p>
        <p
          className={`${
            isAlgorithmRunning ? "text-red-400" : "text-green-400"
          }`}
        >
          {isAlgorithmRunning ? "Off" : "On"}
        </p>
      </div>
    </div>
  );
};

export default Algorithm;
