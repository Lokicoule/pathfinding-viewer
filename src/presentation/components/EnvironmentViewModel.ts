import { Grid } from "../../domain/entities/Grid";

export interface EnvironmentViewModelProps {
  grid: Grid;
  cellSize: number;
}

export class EnvironmentViewModel {
  private constructor(private readonly props: EnvironmentViewModelProps) {}

  public static create(props: EnvironmentViewModelProps): EnvironmentViewModel {
    return new EnvironmentViewModel(props);
  }

  public get grid(): Grid {
    return this.props.grid;
  }

  public get cellSize(): number {
    return this.props.cellSize;
  }
}
