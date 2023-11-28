export class EventNotFoundException extends Error {
  constructor(eventName: string) {
    super(`Event handler for ${eventName} not found`);
  }
}
