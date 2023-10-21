import { InitializeGridCommand } from "../../domain/commands/InitializeGridCommand";
import { CommandHandler } from "../../domain/interfaces/CommandHandler";

export class InitializeGridCommandHandler
  implements CommandHandler<InitializeGridCommand>
{
  handle(command: InitializeGridCommand): void {
    console.log("InitializeGridCommandHandler", command);
  }
}
