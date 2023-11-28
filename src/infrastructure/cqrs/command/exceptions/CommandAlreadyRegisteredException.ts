export class CommandAlreadyRegisteredException extends Error {
  constructor(commandName: string) {
    super(`Command handler for ${commandName} already registered`);
  }
}
