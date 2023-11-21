import {
  ComponentPropsWithRef,
  MouseEventHandler,
  useRef,
  useState,
} from "react";

type TooltipProps = {
  text: string;
};

type TooltipComponent = React.FC<TooltipProps & ComponentPropsWithRef<"div">>;

const Tooltip: TooltipComponent = ({ children, text, ...rest }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<EventTarget | null>(null);
  const ref = useRef(null);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
    setTarget(event.currentTarget);
    setShow(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setShow(false);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
      {...rest}
    >
      {children}
      {show && target && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-10">
          <div className="max-w-xs bg-gray-700 text-white text-xs rounded p-2 bg-opacity-90 shadow-md relative">
            <div className="whitespace-nowrap">{text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
