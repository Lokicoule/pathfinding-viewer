import { QueryContract } from "../contracts/QueryContract";

export abstract class BaseQuery implements QueryContract {
  public static readonly queryName: string;

  public get queryName(): string {
    return (this.constructor as typeof BaseQuery).queryName;
  }
}
