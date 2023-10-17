import { BaseEvent } from "./Event";

export abstract class BaseCommand<CommandType> extends BaseEvent<CommandType> {
  constructor(type: string, payload?: CommandType) {
    super(type, payload);
  }
}
