import { Accessor, Setter, createEffect, createSignal } from "solid-js";

type ToggleReturn<T> = [
  Accessor<T>,
  Setter<T>,
  utils: {
    toggle: VoidFunction
  }
]

function useToggle<T = boolean>(value: T): ToggleReturn<T>;
function useToggle<T>(values: Array<T>): ToggleReturn<T>;
function useToggle<T = boolean>(valueOrValues: T | Array<T>): ToggleReturn<T> {
  const [value, setValue] = createSignal<T>(Array.isArray(valueOrValues) ? valueOrValues[0] : valueOrValues);
  let toggleValue: VoidFunction = () => setValue(!value() as Exclude<T, Function>);

  if(Array.isArray(valueOrValues)) {
    const [index, setIndex] = createSignal<number>(0);
    toggleValue = () => setIndex((index() + 1) % valueOrValues.length);
  
    createEffect(() => {
      setValue(valueOrValues[index()] as Exclude<T, Function>);
    });
  }

  return [value, setValue, {toggle: toggleValue}];
}

export default useToggle;