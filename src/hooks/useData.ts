import { Accessor, Setter, createSignal } from 'solid-js';

export default function useData(): [Accessor<any>, Setter<any>] {
  const [data, setData] = createSignal();

  return [data, setData];
}