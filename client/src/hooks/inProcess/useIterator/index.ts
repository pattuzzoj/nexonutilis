import { Accessor, Setter, createEffect, createSignal } from "solid-js";

interface IteratorOptions {
  initialIndex?: number;
  isCircularLeft?: boolean;
  isCircularRight?: boolean;
}

type IteratorReturn<T> = [
  Accessor<number>,
  Setter<number>,
  iterator: {
    hasNext: () => boolean,
    hasPrevious: () => boolean,
    next: () => T,
    previous: () => T,
    reset: VoidFunction,
    remove: VoidFunction;
  }
]

function useIterator<T>(items: Array<T>): IteratorReturn<T>;
function useIterator<T>(items: Array<T>, options: IteratorOptions): IteratorReturn<T>;
function useIterator<T>(
  items: Array<T>,
  {
    initialIndex = -1,
    isCircularLeft = false,
    isCircularRight = false,
  }: IteratorOptions = {}
): IteratorReturn<T> {
  const [currentIndex, setCurrentIndex] = createSignal<number>(initialIndex);
  const [currentItem, setCurrentItem] = createSignal<T>(items[currentIndex()]);
  const itemsLength = items.length;

  createEffect(() => setCurrentItem(items[currentIndex()] as Exclude<T, Function>));

  const next = () => {
    if(hasNext()) {
      setCurrentIndex((currentIndex() + 1) % itemsLength);
    }

    return currentItem();
  }

  const previous = () => {
    if(hasPrevious()) {
      setCurrentIndex((currentIndex() - 1 + itemsLength) % itemsLength);
    }

    return currentItem();
  }

  const hasNext = () => isCircularRight || (currentIndex() + 1) < itemsLength;
  const hasPrevious = () => isCircularLeft || (currentIndex() - 1) >= 0;
  const reset = () => setCurrentIndex(initialIndex);
  const remove = () => items.splice(currentIndex(), 1);

  return [
    currentIndex,
    setCurrentIndex,
    {
      hasNext,
      hasPrevious,
      next,
      previous,
      reset,
      remove,
    }
  ]
}

export default useIterator;