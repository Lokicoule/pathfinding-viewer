import { compositionRoot } from "../../bootstrapping/bootstrap";
import { Playback } from "../../domain/valueObjects/Playback";
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

export const usePlaybackSelector = (
  selector: (maze: Playback, pathfinding: Playback) => boolean
) => {
  const { playback: mazePlayback } = useMazePlayback();
  const { playback: pathfindingPlayback } = usePathfindingPlayback();

  return selector(mazePlayback, pathfindingPlayback);
};

export const usePlayback = () => {
  const { playback: mazePlayback } = useMazePlayback();
  const { playback: pathfindingPlayback } = usePathfindingPlayback();

  return {
    isPlaying: mazePlayback.isPlaying() || pathfindingPlayback.isPlaying(),
    isPaused: mazePlayback.isPaused() || pathfindingPlayback.isPaused(),
    isResumed: mazePlayback.isResumed() || pathfindingPlayback.isResumed(),
    isStopped: mazePlayback.isStopped() && pathfindingPlayback.isStopped(),
  };
};
