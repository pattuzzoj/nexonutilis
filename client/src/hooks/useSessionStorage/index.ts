import { Accessor, Setter } from "solid-js";
import useStorage from "hooks/useStorage";

interface SessionStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

type SessionStorageReturn<T> = [
  Accessor<T>,
  Setter<T>,
  utils: {
    removeSessionStorageData: VoidFunction
  }
];

function useSessionStorage<T>(key: string): SessionStorageReturn<T>;
function useSessionStorage<T>(key: string, options: SessionStorageOptions<T>): SessionStorageReturn<T>;
function useSessionStorage<T>(key: string, initialData: T, options: SessionStorageOptions<T>): SessionStorageReturn<T>;
function useSessionStorage<T>(key: string, initialDataOrOptions?: T | SessionStorageOptions<T>, options?: SessionStorageOptions<T>): SessionStorageReturn<T> {
  let storageData, setStorageData, removeSessionStorageData;

  if(options) {
    [storageData, setStorageData, {removeStorageData: removeSessionStorageData}] = useStorage<T>(key, initialDataOrOptions as T, {storage: sessionStorage, ...options});
  } else if(initialDataOrOptions && typeof initialDataOrOptions === "object" && ("serializer" in initialDataOrOptions || "deserializer" in initialDataOrOptions)) {
    [storageData, setStorageData, {removeStorageData: removeSessionStorageData}] = useStorage<T>(key, {storage: sessionStorage, ...initialDataOrOptions});
  } else if(initialDataOrOptions) {
    [storageData, setStorageData, {removeStorageData: removeSessionStorageData}] = useStorage<T>(key, initialDataOrOptions as T, {storage: sessionStorage});
  } else {
    [storageData, setStorageData, {removeStorageData: removeSessionStorageData}] = useStorage<T>(key, {storage: sessionStorage});
  }

  return [storageData, setStorageData, {removeSessionStorageData}];
}

export default useSessionStorage;