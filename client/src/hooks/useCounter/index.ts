import { Accessor, createSignal, createEffect } from "solid-js";

interface CounterOptions {
  defaultStep?: number;
  minCount?: number;
  maxCount?: number;
  onValueChange?: (value: number) => void;
  onStepChange?: (step: number) => void;
  onSet?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  onMinLimit?: (minCount: number) => void;
  onMaxLimit?: (maxCount: number) => void;
  onReset?: (initialCount: number) => void;
}

type CounterReturn = [
  Accessor<number>,
  (value: number) => void,
  {
    isValid: (value: number) => boolean;
    hasNext: () => boolean;
    hasPrevious: () => boolean;
    setStep: (step: number) => void;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
  }
];

function useCounter(
  initialValue: number,
  {
    defaultStep = 1,
    minCount = -Infinity,
    maxCount = Infinity,
    onSet,
    onIncrement,
    onDecrement,
    onMinLimit,
    onMaxLimit,
    onValueChange,
    onStepChange,
    onReset
  }: CounterOptions = {}
): CounterReturn {
  const [count, setCount] = createSignal<number>(initialValue);
  
  if(onValueChange) {
    createEffect(() => onValueChange(count()));
  }

  const setCurrentCount = (value: number) => {
    if(isValid(value)) {
      setCount(value);
      onSet?.(value);
    }
  };

  const hasNext = () => (count() + defaultStep) <= maxCount;
  const hasPrevious = () => (count() - defaultStep) >= minCount;
  const increment = () => {
    if(hasNext()) {
      setCount(count() + defaultStep);
      (onValueChange ?? onIncrement)?.(count());
    } else {
      onMaxLimit?.(maxCount);
    }
  };
  const decrement = () => {
    if(hasPrevious()) {
      setCount(count() - defaultStep);
      (onValueChange ?? onDecrement)?.(count());
    } else {
      onMinLimit?.(minCount);
    }
  };
  const setStep = (step: number) => {
    defaultStep = step;
    onStepChange?.(step);
  };
  const isValid = (value: number) => (value >= minCount && value <= maxCount);
  const reset = () => {
    setCount(initialValue);
    onReset?.(initialValue);
  };

  return [
    count,
    setCurrentCount,
    {
      isValid,
      hasNext,
      hasPrevious,
      setStep,
      increment,
      decrement,
      reset,
    }
  ];
}

export default useCounter;