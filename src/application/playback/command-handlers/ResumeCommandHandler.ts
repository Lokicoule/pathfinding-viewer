import { Command } from "@domain/interfaces/Command";
import { CommandHandler } from "@domain/interfaces/CommandHandler";
import { PlaybackStore } from "@infra/stores/PlaybackStore";

export class ResumeCommandHandler<T extends Command>
  implements CommandHandler<T>
{
  constructor(private readonly playbackStore: PlaybackStore) {}

  execute(): void {
    this.playbackStore.setPlayback("RESUME");
  }
}
