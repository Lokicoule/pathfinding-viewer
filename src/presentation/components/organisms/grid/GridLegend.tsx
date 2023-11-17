import { NODE_PIXEL_SIZE } from "../../../../shared/constants";

export type LegendComponent = React.FC<React.HTMLAttributes<HTMLDivElement>>;

export const Legend: LegendComponent = ({ className, ...props }) => {
  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-10 ${className}`}
      {...props}
    >
      <div className="flex justify-center items-center gap-2">
        <div
          className="cell start"
          style={{
            width: `${NODE_PIXEL_SIZE}px`,
            height: `${NODE_PIXEL_SIZE}px`,
          }}
        ></div>
        <p className="font-bold text-white">Start</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className="cell end"
          style={{
            width: `${NODE_PIXEL_SIZE}px`,
            height: `${NODE_PIXEL_SIZE}px`,
          }}
        ></div>
        <p className="font-bold  text-white">End</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className="cell empty bounding"
          style={{
            width: `${NODE_PIXEL_SIZE}px`,
            height: `${NODE_PIXEL_SIZE}px`,
          }}
        ></div>
        <p className="font-bold text-white">Empty</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className="cell wall bounding"
          style={{
            width: `${NODE_PIXEL_SIZE}px`,
            height: `${NODE_PIXEL_SIZE}px`,
          }}
        ></div>
        <p className="font-bold text-white">Wall</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className="cell explored exploring"
          style={{
            width: `${NODE_PIXEL_SIZE}px`,
            height: `${NODE_PIXEL_SIZE}px`,
            animationIterationCount: "infinite",
          }}
        ></div>
        <p className="font-bold text-white">Explored</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <div
          className="cell path pathing"
          style={{
            width: `${NODE_PIXEL_SIZE}px`,
            height: `${NODE_PIXEL_SIZE}px`,
            animationIterationCount: "infinite",
          }}
        ></div>
        <p className="font-bold text-white">Path</p>
      </div>
    </div>
  );
};
