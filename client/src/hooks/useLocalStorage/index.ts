import { Accessor, Setter } from "solid-js";
import useStorage from "hooks/useStorage";

interface LocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

type LocalStorageReturn<T> = [
  Accessor<T>,
  Setter<T>,
  utils: {
    removeLocalStorageData: VoidFunction
  }
];

function useLocalStorage<T>(key: string): LocalStorageReturn<T>;
function useLocalStorage<T>(key: string, initialData: T): LocalStorageReturn<T>;
function useLocalStorage<T>(key: string, options: LocalStorageOptions<T>): LocalStorageReturn<T>;
function useLocalStorage<T>(key: string, initialData: T, options: LocalStorageOptions<T>): LocalStorageReturn<T>;
function useLocalStorage<T>(key: string, initialDataOrOptions?: T | LocalStorageOptions<T>, options?: LocalStorageOptions<T>): LocalStorageReturn<T> {
  let storageData, setStorageData, removeLocalStorageData;

  if(options) {
    [storageData, setStorageData, {removeStorageData: removeLocalStorageData}] = useStorage<T>(key, initialDataOrOptions as T, {storage: localStorage, ...options});
  } else if(initialDataOrOptions && typeof initialDataOrOptions === "object" && ("serializer" in initialDataOrOptions || "deserializer" in initialDataOrOptions)) {
    [storageData, setStorageData, {removeStorageData: removeLocalStorageData}] = useStorage<T>(key, {storage: localStorage, ...initialDataOrOptions});
  } else if(initialDataOrOptions) {
    [storageData, setStorageData, {removeStorageData: removeLocalStorageData}] = useStorage<T>(key, initialDataOrOptions as T, {storage: localStorage});
  } else {
    [storageData, setStorageData, {removeStorageData: removeLocalStorageData}] = useStorage<T>(key, {storage: localStorage});
  }

  return [storageData, setStorageData, {removeLocalStorageData}];
}

export default useLocalStorage;