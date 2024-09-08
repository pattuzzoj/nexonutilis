import { Accessor, createSignal, createEffect } from "solid-js";

interface IndexOptions {
  initialValue?: number;
  defaultStep?: number;
  minIndex?: number;
  maxIndex?: number;
  isCircularLeft?: boolean;
  isCircularRight?: boolean;
  onValueChange?: (value: number) => void;
  onStepChange?: (step: number) => void;
  onSet?: (index: number) => void;
  onNext?: (index: number) => void;
  onPrevious?: (index: number) => void;
  onMinLimit?: (minIndex: number) => void;
  onMaxLimit?: (maxIndex: number) => void;
  onLengthChange?: (length: number) => void;
  onReset?: (initialIndex: number) => void;
}

type IndexReturn = [
  Accessor<number>,
  (index: number) => void,
  {
    isValid: (index: number) => boolean;
    hasNext: () => boolean;
    hasPrevious: () => boolean;
    next: VoidFunction;
    previous: VoidFunction;
    getNext: () => number | null;
    getPrevious: () => number | null;
    getLength: () => number;
    setLength: (length: number) => void;
    getStep: () => number;
    setStep: (step: number) => void;
    getMin: () => number;
    setMin: (min: number) => void;
    getMax: () => number;
    setMax: (min: number) => void;
    reset: VoidFunction;
  }
];

function useIndex(
  length: number,
  {
    initialValue = 0,
    defaultStep = 1,
    minIndex = 0,
    maxIndex = length,
    isCircularLeft = false,
    isCircularRight = false,
    onValueChange,
    onStepChange,
    onSet,
    onNext,
    onPrevious,
    onMinLimit,
    onMaxLimit,
    onLengthChange,
    onReset,
  }: IndexOptions = {}
): IndexReturn {
  initialValue = Math.max(initialValue, minIndex);
  minIndex = Math.max(0, minIndex);
  maxIndex = Math.min(length, maxIndex + 1);
  const [index, setIndex] = createSignal<number>(initialValue);

  if(onValueChange) {
    createEffect(() => onValueChange(index()));
  }

  const setCurrentIndex = (index: number) => {
    if(isValid(index)) {
      setIndex(index);
      onSet?.(index);
    }
  };

  const next = () => {
    let index = getNext();

    if(typeof index == "number") {
      setCurrentIndex(index);
      onNext?.(index);

      if(index == maxIndex) onMaxLimit?.(index);
    }
  };

  const previous = () => {
    let index = getPrevious();

    if(typeof index == "number") {
      setCurrentIndex(index);
      onPrevious?.(index);

      if(index == minIndex) onMinLimit?.(index);
    }
  };

  const getNext = () => {
    if(hasNext()) {
      let currentIndex = index();

      if(!((currentIndex + defaultStep) < maxIndex)) {
        currentIndex += minIndex; 
      }

      currentIndex = (currentIndex + defaultStep) % maxIndex;

      return currentIndex;
    }

    return null;
  }

  const getPrevious = () => {
    if(hasPrevious()) {
      let currentIndex = index();

      if((currentIndex - defaultStep) < minIndex) {
        currentIndex -= minIndex; 
      }

      currentIndex = (currentIndex - defaultStep + maxIndex) % maxIndex;

      return currentIndex;
    }

    return null;
  }

  const setStep = (newStep: number) => {
    defaultStep = newStep;
    onStepChange?.(newStep);
  };
  
  const getStep = () => defaultStep;
  const getMin = () => minIndex;
  const getMax = () => maxIndex;
  const getLength = () => length;
  const setLength = (newLength: number) => {
    length = newLength;
    onLengthChange?.(newLength);
  };
  const setMin = (newMinLimit: number) => minIndex = newMinLimit;
  const setMax = (newMaxLimit: number) => maxIndex = newMaxLimit;

  
  const isValid = (index: number) => (index >= minIndex && index < maxIndex);
  const hasNext = () => isCircularRight || (index() + defaultStep) < maxIndex;
  const hasPrevious = () => isCircularLeft || (index() - defaultStep) >= minIndex;
  const reset = () => {
    setIndex(initialValue);
    onReset?.(initialValue);
  };

  return [
    index,
    setCurrentIndex,
    {
      isValid,
      hasNext,
      hasPrevious,
      next,
      previous,
      getNext,
      getPrevious,
      getLength,
      setLength,
      getStep,
      setStep,
      getMin,
      setMin,
      getMax,
      setMax,
      reset,
    }
  ];
}

export default useIndex;
