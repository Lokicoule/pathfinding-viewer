export class CommandNotFoundException extends Error {
  constructor(commandName: string) {
    super(`Command handler for ${commandName} not found`);
  }
}
