import { Accessor, Setter, createSignal } from "solid-js";

type PreviousReturn<T> = [
  Accessor<T>,
  Setter<T>
];

export default function usePrevious<T>(value: T): PreviousReturn<T> {
  return createSignal<T>(value);
}