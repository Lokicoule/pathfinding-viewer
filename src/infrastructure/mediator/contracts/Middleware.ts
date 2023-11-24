import { CommandBus } from "../bus";

export interface Middleware<Handler> {
  invoke(handler: Handler, context: CommandBus): Handler;
}

export type MiddlewareType<Handler> = (
  handler: Handler,
  context: CommandBus
) => Handler;
