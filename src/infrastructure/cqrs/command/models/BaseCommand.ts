import { CommandContract } from "../contracts/CommandContract";

export abstract class BaseCommand implements CommandContract {
  public static readonly commandName: string;

  public get commandName(): string {
    return (this.constructor as typeof BaseCommand).commandName;
  }
}
