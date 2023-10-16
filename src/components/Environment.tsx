import { useEffect, useRef } from "react";
import { Grid } from "./Grid";

const Environment = () => {
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

    grid.show();

    return () => {
      console.log("Environment component unmounted");
    };
  }, []);

  return <canvas ref={canvasRef} width={600} height={400} />;
};

export default Environment;
