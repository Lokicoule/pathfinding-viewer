import { compositionRoot } from "../../bootstrapping/bootstrap";
import { PlaybackStoreState } from "../../infrastructure/stores/PlaybackStore";
import { useStoreWithSelector } from "../adapters/store/hooks/useStoreWithSelector";

export const useMazePlayback = () => {
  return useStoreWithSelector<
    PlaybackStoreState,
    Pick<PlaybackStoreState, "playback">
  >(compositionRoot.stores.mazePlaybackStore, (state) => ({
    playback: state.playback,
  }));
};

export const usePathfindingPlayback = () => {
  return useStoreWithSelector<
    PlaybackStoreState,
    Pick<PlaybackStoreState, "playback">
  >(compositionRoot.stores.pathfindingPlaybackStore, (state) => ({
    playback: state.playback,
  }));
};
