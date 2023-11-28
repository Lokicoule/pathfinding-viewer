export interface ICommand {
  readonly commandName: string;
}

export abstract class BaseCommand implements ICommand {
  public static readonly commandName: string;

  public get commandName(): string {
    return (this.constructor as typeof BaseCommand).commandName;
  }
}
