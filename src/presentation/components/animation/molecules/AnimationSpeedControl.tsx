import { useState } from "react";

import { Speed, UpdateSpeedCommand } from "@domain/animation";
import { useCommand } from "../../../adapters/mediator/hooks";
import { useAlgorithm } from "../../../hooks/useAlgorithm";
import { useAnimation } from "../../../hooks/useAnimation";
import { Tooltip } from "../../ui";

type AnimationSpeedControlComponent = React.FC<
  React.HTMLAttributes<HTMLInputElement>
>;

const AnimationSpeedControl: AnimationSpeedControlComponent = ({
  className,
  ...props
}) => {
  const sendCommand = useCommand();
  const { speed } = useAnimation();
  const { isAlgorithmRunning } = useAlgorithm();

  const [tempSpeed, setTempSpeed] = useState(Speed.reverse(speed.getValue()));

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempSpeed(parseInt(e.target.value));
  };

  const handleSpeedSet = () => {
    sendCommand(new UpdateSpeedCommand(Speed.create(Speed.reverse(tempSpeed))));
  };

  const speedLabel =
    tempSpeed >= Math.floor((Speed.FAST + Speed.SLOW) / 1.15) ? "Fast" : "Slow";

  return (
    <div
      className={`flex flex-col justify-center items-center gap-2 ${className}`}
    >
      <Tooltip text={`Animation Speed (${speedLabel})`}>
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
      </Tooltip>
    </div>
  );
};

export default AnimationSpeedControl;
