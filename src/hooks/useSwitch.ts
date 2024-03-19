import { Accessor, Setter, createSignal } from 'solid-js';

export default function useSwitch<T>(initialValue: T): [Accessor<T>, Setter<T>] {
  const [isActive, setIsActive] = createSignal<T>(initialValue);

  return [isActive, setIsActive];
}
