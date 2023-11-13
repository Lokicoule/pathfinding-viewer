import { ALGORITHMS } from "../constants/algorithmConstants";
import { useAlgorithm } from "../hooks/useAlgorithm";

type AlgorithmComponent = React.FC;

const Algorithm: AlgorithmComponent = () => {
  const { algorithm } = useAlgorithm();

  return (
    <div className="flex justify-start gap-2">
      <p className="font-bold">Algorithm: </p>
      {algorithm ? (
        <p className="font-bold">{ALGORITHMS.get(algorithm)}</p>
      ) : null}
    </div>
  );
};

export default Algorithm;
