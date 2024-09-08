import { Accessor, Setter, createEffect, createSignal } from "solid-js"

export default function useNotification<T = string>(initialValue: T, lifespan: number, callback?: <T>(value: T) => void): [Accessor<T>, Setter<T>] {
  const [notification, setNotification] = createSignal<T>(initialValue);
  
  createEffect(() => {
    callback?.(notification());

    setTimeout(() => setNotification(initialValue), lifespan);
  })

  return [notification, setNotification]
}