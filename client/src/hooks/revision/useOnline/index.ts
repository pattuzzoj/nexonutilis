import { Accessor, Setter, createSignal} from "solid-js";
import useEventListener from "../useEventListener";

type onlineReturn = [
  Accessor<boolean>,
  Setter<boolean>
];

function useOnline(): onlineReturn {
  const [isOnline, setIsOnline] = createSignal(window.navigator.onLine);

  useEventListener(window, "ononline", () => setIsOnline(true));
  useEventListener(window, "onoffline", () => setIsOnline(false));

  return [isOnline, setIsOnline];
}

export default useOnline();