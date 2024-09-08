import { Accessor, createEffect, createSignal, on } from "solid-js";
import useToggle from "hooks/revision/useToggle";
import useEventListener from "hooks/revision/useEventListener";
import useIndex from "hooks/useIndex";

type MediaType<T> = T & {
  src: string,
  [key: string]: boolean | number | string;
}

interface MediaConfig {
  isCircularLeft?: boolean;
  isCircularRight?: boolean;
  initialVolume?: number;
  initialSpeed?: number;
}

type MediaStatus = "playing" | "paused";

interface MediaControls {
  togglePlayPause: VoidFunction;
  nextPlayback: VoidFunction;
  previousPlayback: VoidFunction;
  hasNextPlayback: () => boolean;
  hasPreviousPlayback: () => boolean;
  increaseTime: (amount: number) => void;
  decreaseTime: (amount: number) => void;
  toggleMuted: VoidFunction;
  setTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setSpeed: (speed: number) => void;
  toggleShuffle: VoidFunction;
  toggleLoop: VoidFunction;
};

interface MediaState {
  playbackStatus: Accessor<MediaStatus>;
  currentTimeInSeconds: Accessor<number>;
  durationTimeInSeconds: Accessor<number>;
  currentTimeFormatted: Accessor<string>;
  durationTimeFormatted: Accessor<string>;
  playbackVolume: Accessor<number>;
  playbackSpeed: Accessor<number>;
  isShuffle: Accessor<boolean>;
  isLoop: Accessor<boolean>;
};

type MediaReturn<T> = [
  playback: Accessor<MediaType<T>>,
  setPlaybackPlaylist: (playlist: Array<MediaType<T>>) => void,
  {
    controls: MediaControls,
    state: MediaState
  }
];

function useMedia<T>(player: HTMLAudioElement | HTMLVideoElement, playlist: Array<MediaType<T>>): MediaReturn<T>;
function useMedia<T>(player: HTMLAudioElement | HTMLVideoElement, playlist: Array<MediaType<T>>, config: MediaConfig): MediaReturn<T>;
function useMedia<T>(player: HTMLAudioElement | HTMLVideoElement, playlist: Array<MediaType<T>>, config?: MediaConfig): MediaReturn<T> {
  const [playbackPlaylist, setPlaybackPlaylist] = createSignal<Array<MediaType<T>>>(playlist);
  const [currentIndex, _setCurrentIndex, index] = useIndex(playlist.length, {isCircularLeft: config?.isCircularLeft, isCircularRight: config?.isCircularRight});
  const [playback, setPlayback] = createSignal<MediaType<T>>(playbackPlaylist()[currentIndex()]);
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = createSignal<number>(0);
  const [durationTimeInSeconds, setDurationTimeInSeconds] = createSignal<number>(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = createSignal<string>("00:00");
  const [durationTimeFormatted, setDurationTimeFormatted] = createSignal<string>("00:00");
  const [volume, setVolume] = createSignal<number>(config?.initialVolume ?? 0.5);
  const [speed, setSpeed] = createSignal<number>(config?.initialSpeed ?? 1);
  const [status, setStatus] = createSignal<MediaStatus>("paused");
  const [isShuffle, _setIsShuffle, {toggle: toggleShuffle}] = useToggle(false);
  const [isLoop, _setIsLoop, {toggle: toggleLoop}] = useToggle(false);
  const [isMuted, _setIsMuted, {toggle: toggleMuted}] = useToggle(false);
  
  createEffect(on(playback, (current) => {
    player.src = current.src;

    if(status() == "playing") {
      player.play();
    }
  }));

  createEffect(() => player.volume = volume());
  createEffect(() => player.playbackRate = speed());
  createEffect(() => setPlayback(playbackPlaylist()[currentIndex()] as Exclude<MediaType<T>, Function>));
  createEffect(() => {
    setPlaybackPlaylist(isShuffle() ? shuffle(playlist) : playlist);
    index.reset();
  });
  createEffect(() => player.loop = isLoop());
  createEffect(() => player.muted = isMuted());

  function shuffle(playlist: Array<MediaType<T>>) {
    let shufflePlaylist = playlist.slice();

    for(let index = 0; index < playlist.length; index++) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      [shufflePlaylist[index], shufflePlaylist[randomIndex]] = [shufflePlaylist[randomIndex], shufflePlaylist[index]];
    }

    return shufflePlaylist;
  }

  function togglePlayPause() {
    if(player.paused) {
      playMedia();
    } else {
      pauseMedia();
    }
  }

  function playMedia() {
    player.play();
  }

  function pauseMedia() {
    player.pause();
  }

  function setTime(seconds: number) {
    player.currentTime = seconds;
  }

  function increaseTime(seconds: number) {
    player.currentTime += seconds;
  }

  function decreaseTime(seconds: number) {
    player.currentTime -= seconds;
  }

  function formatTime(seconds: number): string {
    const hours: number = (seconds > 3600) ? Math.trunc(seconds / 3600) : 0;
    const minutes: number = (seconds > 60) ? Math.trunc((seconds % 3600) / 60) : 0;
    seconds = Math.trunc(seconds % 60);

    const hoursFormatted = (hours > 0) ? hours.toString().padStart(1, "0") + ":" : "";
    const minutesFormatted = minutes.toString().padStart(1, "0") + ":";
    const secondsFormatted = seconds.toString().padStart(2, "0");
    const timeFormatted: string = hoursFormatted + minutesFormatted + secondsFormatted;

    return timeFormatted;
  }

  useEventListener(player, "ended", index.next);
  useEventListener(player, "timeupdate", () => {
    setCurrentTimeInSeconds(player.currentTime);
    setCurrentTimeFormatted(formatTime(player.currentTime));
  });
  useEventListener(player, "durationchange", () => {
    setDurationTimeInSeconds(player.duration);
    setDurationTimeFormatted(formatTime(player.duration));
  });
  useEventListener(player, "playing", () => setStatus("playing"));
  useEventListener(player, "pause", () => setStatus("paused"));

  return [
    playback,
    setPlaybackPlaylist,
    {
      controls: {
        nextPlayback: index.next,
        previousPlayback: index.previous,
        hasNextPlayback: index.hasNext,
        hasPreviousPlayback: index.hasPrevious,
        increaseTime,
        decreaseTime,
        setTime,
        setVolume,
        setSpeed,
        togglePlayPause,
        toggleMuted,
        toggleShuffle,
        toggleLoop,
      },
      state: {
        playbackStatus: status,
        currentTimeInSeconds,
        durationTimeInSeconds,
        currentTimeFormatted,
        durationTimeFormatted,
        playbackVolume: volume,
        playbackSpeed: speed,
        isShuffle,
        isLoop,
      }
    }
  ];
}

export default useMedia;