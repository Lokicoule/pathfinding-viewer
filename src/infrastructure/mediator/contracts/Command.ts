export interface Command {
  type: string;
}

export interface CommandWithPayload<T> extends Command {
  payload: T;
}

export abstract class CommandBase implements Command {
  constructor(public readonly type: string) {}
}

export abstract class CommandBaseWithPayload<T>
  implements CommandWithPayload<T>
{
  constructor(public readonly type: string, public readonly payload: T) {}
}
