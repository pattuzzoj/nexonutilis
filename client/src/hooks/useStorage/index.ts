import useEventListener from "hooks/useEventListener";
import { Accessor, Setter, createSignal, createEffect } from "solid-js";
import { isServer } from "solid-js/web";

interface StorageOptions<T> {
  storage: Storage;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}

type StorageReturn<T> = [
  Accessor<T>,
  Setter<T>,
  utils: {
    removeStorageData: VoidFunction
  }
];

function useStorage<T>(key: string, options: StorageOptions<T>): StorageReturn<T>;
function useStorage<T>(key: string, initialData: T, options: StorageOptions<T>): StorageReturn<T>;
function useStorage<T>(key: string, initialDataOrOptions: T | StorageOptions<T>, options?: StorageOptions<T>): StorageReturn<T> {
  let initialData: T = {} as T;

  if(options) {
    initialData = initialDataOrOptions as T;
  } else {
    options = initialDataOrOptions as StorageOptions<T>;
  }

  const {storage, serializer = JSON.stringify, deserializer = JSON.parse} = options;

  if(!isServer) {
    const storedData = storage.getItem(key);

    if(storedData) {
      try {
        initialData = deserializer(storedData);
      } catch(e) {
        console.error(`Error: Failed to deserialize storage data for key: ${key}:`, e);
      }
    }
  }

  const [storageData, setStorageData] = createSignal<T>(initialData);
  const removeStorageData = () => storage.removeItem(key);

  createEffect(() => {
    try {
      storage.setItem(key, serializer(storageData()))
    } catch(e) {
      console.error(`Error: Failed to serialize storage data for key: ${key}:`, e);
    }
  });

  if(!isServer) {
    useEventListener(window, "storage", StorageUpdateListener as EventListenerOrEventListenerObject);
  }

  function StorageUpdateListener(event: StorageEvent) {
    if (event.key == key && event.newValue != null) {
      setStorageData(deserializer ? deserializer(event.newValue) : JSON.parse(event.newValue));
    }
  }

  return [storageData, setStorageData, {removeStorageData}];
}

export default useStorage;