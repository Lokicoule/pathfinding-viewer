export class QueryAlreadyRegisteredException extends Error {
  constructor(queryName: string) {
    super(`Query handler for ${queryName} already registered`);
  }
}
