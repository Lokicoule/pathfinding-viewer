import { EventBase } from "@/infrastructure/mediator";

export class AlgorithmUpdatedEvent extends EventBase {
  public static readonly type = "AlgorithmUpdatedEvent";

  constructor() {
    super(AlgorithmUpdatedEvent.type);
  }
}
