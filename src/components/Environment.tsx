import { useEffect, useRef } from "react";
import { compositionRoot } from "../application/composition";
import { Grid } from "./Grid";
import { EnvironmentController } from "./EnvironmentController";

type EnvironmentProps = {
  controller: EnvironmentController;
};

type EnvironmentComponent = React.FC<EnvironmentProps>;

const Environment: EnvironmentComponent = ({ controller }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    console.log("Environment component mounted");

    const canvasContext = canvasRef.current?.getContext("2d");

    if (!canvasContext) {
      console.error("Canvas context is null");
      return;
    }

    const grid = Grid.create({
      rows: 10,
      cols: 15,
      cellSize: 40,
      canvasContext,
    });

    compositionRoot.cache.set("grid", grid);

    grid.show();

    return () => {
      console.log("Environment component unmounted");
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      onClick={(event) =>
        controller.handleCellChange(
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY
        )
      }
    />
  );
};

export default Environment;
