import { UpdateCellStateCommand, UpdateCellStatePayload } from "..";
import { CellState } from "../../../components/Cell";
import { Result } from "../../../shared/types/Result";
import { EventBus, Handler } from "../../EventBus";

export class UpdateCellStateCommandHandler extends Handler<UpdateCellStateCommand> {
  private constructor(eventBus: EventBus) {
    super(eventBus, UpdateCellStateCommandHandler.name);

    this.setupSubscriptions();
  }

  public static create(eventBus: EventBus): UpdateCellStateCommandHandler {
    return new UpdateCellStateCommandHandler(eventBus);
  }

  public handle(command: UpdateCellStateCommand): void {
    const payload = this.validatePayload(command);

    if (payload.isFailure || payload.value === undefined) {
      console.error(payload.error?.errors);
      throw new Error(payload.error?.message);
    }

    const { cell, state } = payload.value;

    // TODO: Refactor this to use a map of functions.
    if (cell.isWallable && state === CellState.Wall) {
      cell.state = state;
    }

    if (cell.isStartable && state === CellState.Start) {
      cell.state = state;
    }

    if (cell.isEndable && state === CellState.End) {
      cell.state = state;
    }

    cell.show();
  }

  private validatePayload(command: UpdateCellStateCommand): Result<
    UpdateCellStatePayload,
    {
      message: string;
      errors: string[];
    }
  > {
    const { payload } = command;

    if (payload === undefined) {
      return Result.failure({
        message: "Invalid payload.",
        errors: ["Payload must not be undefined."],
      });
    }

    const { cell, state } = payload;
    const errors: string[] = [];

    if (cell === undefined) {
      errors.push("Cell must not be undefined.");
    }

    if (CellState[state] === undefined) {
      errors.push("State must be a valid CellState.");
    }

    if (errors.length > 0) {
      return Result.failure({
        message: "Invalid payload.",
        errors,
      });
    }

    return Result.success(payload);
  }

  private setupSubscriptions(): void {
    this.eventBus.subscribe(UpdateCellStateCommand.name, this);
  }
}
