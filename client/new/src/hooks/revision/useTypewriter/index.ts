import { Accessor, createSignal } from "solid-js";
import useTimer from "hooks/revision/useTimer";
import useCounter from "hooks/useCounter";

type TypewriterReturn = [
  Accessor<string>
]

function useTypewriter(text: string, time: number): TypewriterReturn;
function useTypewriter(text: string, time: number, timePerCharacter: boolean): TypewriterReturn;
function useTypewriter(text: string, time: number, timePerCharacter?: boolean): TypewriterReturn {
  const [typewriter, setTypewriter] = createSignal<string>("");
  const [indexCharacter, index] = useCounter(0, {maxCount: text.length});
  time = timePerCharacter ? time : time / text.length;

  function write(stopTimer: VoidFunction) {
    setTypewriter(typewriter().concat(text[indexCharacter()]));
    index.increment();
    
    if(!index.hasNext()) stopTimer();
  }

  useTimer(write, {delay: time});

  return [typewriter];
}

export default useTypewriter;