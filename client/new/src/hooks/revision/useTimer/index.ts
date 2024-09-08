import { Accessor, createSignal, onCleanup } from "solid-js";
import useCounter from "hooks/useCounter";

interface TimerOptions {
  delay?: number;
  times?: number;
  autoPlay?: boolean;
  autoRestart?: boolean;
}

type TimerReturn = [
  Accessor<number>,
  {
    togglePlayPause: () => void,
    play: () => void,
    pause: () => void,
    isRunning: () => boolean,
    reset: () => void
  }
];

function useTimer(callback: (stopTimer: VoidFunction) => void): TimerReturn;
function useTimer(callback: (stopTimer: VoidFunction) => void, options: TimerOptions): TimerReturn;
function useTimer(callback: (stopTimer: VoidFunction) => void, {delay = 1000, times = Infinity, autoPlay = true, autoRestart = false}: TimerOptions = {}): TimerReturn {
  const [timerId, setTimerId] = createSignal<number | undefined>(undefined);
  const [isRunning, setIsRunning] = createSignal<boolean>(false);
  const [timesOccurred, counter] = useCounter(0, {maxCount: times});

  function timer() {
    if(!isRunning() || !counter.hasNext()) {
      clear();
      return;
    };
    
    callback(() => setIsRunning(false));
    counter.increment();
    setTimerId(setTimeout(timer, delay));
  }

  function togglePlayPause() {
    if(isRunning()) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    if(!isRunning() && !timerId()) {
      setIsRunning(true);
      setTimerId(setTimeout(timer, delay));
    }
  }

  function pause() {
    setIsRunning(false);
    clear();
  }

  function reset() {
    pause();
    counter.reset();

    if(autoRestart) {
      play();
    }
  }

  function clear() {
    if(timerId()) {
      clearTimeout(timerId());
      setTimerId(undefined);
    }
  }

  if(autoPlay) {
    play();
  }

  onCleanup(() => clear());

  return [
    timesOccurred,
    {
      togglePlayPause,
      play,
      pause,
      isRunning,
      reset
    }
  ];
}

export default useTimer;