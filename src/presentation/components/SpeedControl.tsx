import { useState } from "react";
import { UpdateSpeedCommand } from "../../domain/commands/UpdateSpeedCommand";
import { Speed } from "../../domain/valueObjects/Speed";
import { useCommand } from "../adapters/mediator/hooks";
import { useAlgorithm } from "../hooks/useAlgorithm";
import { useSpeed } from "../hooks/useSpeed";

type SpeedControlComponent = React.FC<React.HTMLAttributes<HTMLInputElement>>;

const SpeedControl: SpeedControlComponent = ({ className, ...props }) => {
  const sendCommand = useCommand();
  const { speed } = useSpeed();
  const { isAlgorithmRunning } = useAlgorithm();

  const [tempSpeed, setTempSpeed] = useState(Speed.reverse(speed.getValue()));

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSpeed(parseInt(e.target.value));
  };

  const handleSpeedSet = () => {
    sendCommand(
      UpdateSpeedCommand.name,
      new UpdateSpeedCommand(Speed.create(Speed.reverse(tempSpeed)))
    );
  };

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <p className="font-bold">Speed: </p>
      <input
        disabled={isAlgorithmRunning}
        className={`w-40 h-2 appearance-none rounded-full outline-none cursor-pointer transition-all duration-300 ease-in-out  bg-gradient-to-r from-rose-100 to-teal-100 hover:from-rose-200 hover:to-teal-200 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed`}
        type="range"
        min={Speed.FAST}
        max={Speed.SLOW}
        value={tempSpeed}
        onChange={handleSpeedChange}
        onMouseUp={handleSpeedSet}
        onBlur={handleSpeedSet}
        {...props}
      />
    </div>
  );
};

export default SpeedControl;
