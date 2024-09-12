import { onCleanup } from "solid-js";

type EventType = keyof HTMLElementEventMap | keyof DocumentEventMap | string;
type EventListenerReturn = VoidFunction;

function useEventListener(target: EventTarget, type: EventType, callback: EventListenerOrEventListenerObject | null): EventListenerReturn;
function useEventListener(target: EventTarget, type: EventType, callback: EventListenerOrEventListenerObject | null, options: boolean | AddEventListenerOptions): EventListenerReturn;
function useEventListener(target: EventTarget, type: EventType, callback: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): EventListenerReturn {
  const removeListener = () => target?.removeEventListener(type, callback, options);
  target?.addEventListener(type, callback, options);
  
  onCleanup(removeListener);

  return removeListener;
}

export default useEventListener;