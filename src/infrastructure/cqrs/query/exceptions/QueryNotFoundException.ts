export class QueryNotFoundException extends Error {
  constructor(queryName: string) {
    super(`Query handler for ${queryName} not found`);
  }
}
