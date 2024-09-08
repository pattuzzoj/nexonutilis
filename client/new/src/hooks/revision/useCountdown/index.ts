import { Accessor } from "solid-js";
import useTimer from "hooks/revision/useTimer";
import useCounter from "hooks/useCounter";

type CountdownReturn = [
  Accessor<number>,
  utils: {
    start: VoidFunction,
    reset: Function
  }
]

function useCountdown(countdownStart: number, countdownStop: number = 0): CountdownReturn {
  const [countdown, counter] = useCounter(countdownStart, {minCount: countdownStart, maxCount: countdownStop});
  const [timesOccurred, { togglePlayPause, play, pause, isRunning, reset}] = useTimer((stopTimer: VoidFunction) => {
    counter.decrement();
    if(!counter.hasPrevious()) stopTimer();
  }, { autoPlay: false });

  return [countdown, {start, reset: counter.reset}];
}

export default useCountdown;