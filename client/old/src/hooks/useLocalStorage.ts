import { Setter, Accessor, createSignal, createEffect } from 'solid-js';

export default function useLocalStorage<T>(key: string, initialValue: T): [Accessor<T>, Setter<T>] {
  const [storedValue, setStoredValue] = createSignal<T>((localStorage.getItem(key) as T) || initialValue);
 
  createEffect(() => localStorage.setItem(key, String(storedValue())));

  return [storedValue, setStoredValue];
}
