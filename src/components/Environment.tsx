import { useEffect, useRef } from "react";
import { Grid } from "./Grid";
import { compositionRoot } from "../application/composition";
import { UpdateCellStateCommand } from "../application/commands";
import { CellState } from "./Cell";

const Environment = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCellClick = (e: React.MouseEvent) => {
    const row = Math.floor(e.nativeEvent.offsetY / 40);
    const col = Math.floor(e.nativeEvent.offsetX / 40);

    console.log(`Cell clicked: row = ${row}, col = ${col}`);
    compositionRoot.eventBus.publish(
      UpdateCellStateCommand.create({ row, col, state: CellState.Wall })
    );
  };

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

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      onClick={handleCellClick}
    />
  );
};

export default Environment;
