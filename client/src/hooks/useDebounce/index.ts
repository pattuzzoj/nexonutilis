type DebounceReturn = (...args: any[]) => void;

export default function useDebounce(callback: (...args: any[]) => void, delay: number = 500): DebounceReturn {
  let timeoutId: number;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}