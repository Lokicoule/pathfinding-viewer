import { BaseEvent } from "../../shared/bases/Event";

export interface GridUpdatedPayload {
  readonly rows: number;
  readonly columns: number;
}

export class GridUpdatedEvent extends BaseEvent<GridUpdatedPayload> {
  constructor(payload: GridUpdatedPayload) {
    super(GridUpdatedEvent.name, payload);
  }
}

export type Events = GridUpdatedEvent;
