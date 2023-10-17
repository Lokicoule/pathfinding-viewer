import { CellState } from "../../components/Cell";
import { BaseCommand } from "../../shared/bases/Command";

export interface UpdateCellStatePayload {
  readonly row: number;
  readonly col: number;
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

export type Commands = UpdateCellStateCommand;
