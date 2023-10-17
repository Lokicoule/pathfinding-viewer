import { UpdateCellStateCommand, UpdateCellStatePayload } from "..";
import { CellState } from "../../../components/Cell";
import { Result } from "../../../shared/types/Result";
import { EventBus, Handler } from "../../EventBus";
import { compositionRoot } from "../../composition";

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
      return;
    }

    const { row, col, state } = payload.value;

    console.log(`Cell at row ${row} and column ${col} is now ${state}.`);
    compositionRoot.cache.get("grid").updateCellState(row, col, state);
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

    const { row, col, state } = payload;
    const errors: string[] = [];

    if (row < 0) {
      errors.push("Row must be greater than or equal to 0.");
    }

    if (col < 0) {
      errors.push("Column must be greater than or equal to 0.");
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
