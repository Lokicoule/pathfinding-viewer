import { Cell, CellState } from "../../domain/entities/Cell";
import { BaseCommand } from "../../shared/bases/Command";

export interface UpdateCellStatePayload {
  readonly cell: Cell;
  readonly state: CellState;
}

export class UpdateCellStateCommand extends BaseCommand<UpdateCellStatePayload> {
  private constructor(payload: UpdateCellStatePayload) {
    super(UpdateCellStateCommand.name, payload);
  }

  public static create(
    payload: UpdateCellStatePayload
  ): UpdateCellStateCommand {
    return new UpdateCellStateCommand(payload);
  }
}

export class ResetGridCommand extends BaseCommand<void> {
  private constructor() {
    super(ResetGridCommand.name);
  }

  public static create(): ResetGridCommand {
    return new ResetGridCommand();
  }
}

export class InitializeGridCommand extends BaseCommand<void> {
  private constructor() {
    super(InitializeGridCommand.name);
  }

  public static create(): InitializeGridCommand {
    return new InitializeGridCommand();
  }
}

export type Commands =
  | UpdateCellStateCommand
  | ResetGridCommand
  | InitializeGridCommand;
