export interface Query {
  type: string;
}

export interface QueryWithPayload<T> extends Query {
  payload: T;
}

export abstract class QueryBase implements Query {
  constructor(public readonly type: string) {}
}

export abstract class QueryBaseWithPayload<T> implements QueryWithPayload<T> {
  constructor(public readonly type: string, public readonly payload: T) {}
}
