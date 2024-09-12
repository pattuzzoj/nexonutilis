import { JSXElement, createContext, createSignal, onCleanup, useContext } from "solid-js";

export const IndexedDBContext = createContext();

interface StoreSchema {
  name: string,
  options?: {
    keyPath?: string,
    autoIncrement?: boolean
  },
  index?: {
    name: string,
    keyPath: string,
    options?: {
      unique?: boolean,
      multiEntry?: boolean
    },
  }[]
}

type Key = IDBValidKey | IDBKeyRange

interface StoreOperations<T> {
  add: (data: T, key?: Exclude<Key, IDBKeyRange>) => void;
  put: (data: T, key?: Exclude<Key, IDBKeyRange>) => void;
  get: (key: Key) => void;
  getAll: (key?: Key, count?: number) => void;
  del: (key: Key) => void;
  count: (key?: Key) => void;
  clear: VoidFunction;
	item: () => T;
	listItem: () => Array<T>
}

interface IndexedDBProps {
	value: {
		name: string,
		version: number,
		stores: StoreSchema[],
	}
	children: JSXElement;
}

export default function IndexedDBProvider(props: IndexedDBProps) {
	const {name, version, stores} = props.value;
  const [database, setDatabase] = createSignal<IDBDatabase>();
  
  let request = indexedDB.open(name, version);

  request.onsuccess = (event: Event) => {
    const db = (event.target as IDBRequest).result;
    setDatabase(db);

    db.onversionchange = () => {
      db.close();

      window.location.reload();
    }
  }

  request.onerror = (event: Event) => {
    console.error("Error on open IndexedDB:", (event.target as IDBOpenDBRequest).error);
  }

  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const request = event.target as IDBRequest;
    const db = request.result;

    for(const currentStore of db.objectStoreNames) {
      if(!stores.some(store => store.name == currentStore)) {
        db.deleteObjectStore(currentStore);
      }
    }

    for(const newStore of stores) {
      if(!db.objectStoreNames.contains(newStore.name)) {
        db.createObjectStore(newStore.name, newStore?.options);
      }

      const currentStore = request.transaction!.objectStore(newStore.name);

      for(const currentIndex of currentStore.indexNames) {
        if(!newStore?.index?.some(index => index.name == currentIndex)) {
          currentStore.deleteIndex(currentIndex);
        }
      }

      newStore?.index?.forEach(index => {
        if(!currentStore.indexNames.contains(index.name)) {
          currentStore.createIndex(index.name, index.keyPath, index?.options)
        }
      })
    }
  }

	function useStore<T>(name: string): StoreOperations<T> {
		const [item, setItem] = createSignal<T>({} as T);
		const [listItem, setListItem] = createSignal<Array<T>>([]);

		function transaction(name: string, type: "readonly" | "readwrite") {
			const transaction = database()!.transaction(name, type);
	
			transaction.onerror = () => {
				transaction.abort();
			}
	
			return transaction.objectStore(name);
		}

    function runCommand({
      type,
      action,
      args,
      handleEvents
    }: {
      type: "readonly" | "readwrite",
      action: "add" | "put" | "get" | "getAll" | "delete" | "count" | "clear",
      args: Array<any>,
      handleEvents: { onSuccess: (result?: any) => void, onError: (error?: any) => void }
    }) {
			const store = transaction(name, type);
      const request = (store[action] as (...args: any[]) => IDBRequest<any>)(...args);

			request.onsuccess = () => handleEvents.onSuccess(request.result);
			request.onerror = () => handleEvents.onError(request.error);
    }

    function add<T>(data: T, key?: Exclude<Key, IDBKeyRange>) {
      runCommand({
        type: "readwrite",
        action: "add",
        args: [data, key],
        handleEvents: {
          onSuccess: result => console.log("Added:", result),
          onError: error => console.error("Add Error:", error)
        }
      });
    }

    function put<T>(data: T, key?: Exclude<Key, IDBKeyRange>) {
      runCommand({
        type: "readwrite",
        action: "put",
        args: [data, key],
        handleEvents: {
          onSuccess: result => console.log("Updated:", result),
          onError: error => console.error("Update Error:", error)
        }
      });
    }

    function get(key: Key) {
      runCommand({
        type: "readonly",
        action: "get",
        args: [key],
        handleEvents: {
          onSuccess: result => {
            setItem(result);
            console.log("Retrieved:", result);
          },
          onError: error => console.error("Get Error:", error)
        }
      });
    }

    function getAll(key?: Key, count?: number) {
      runCommand({
        type: "readonly",
        action: "getAll",
        args: [key, count],
        handleEvents: {
          onSuccess: result => {
            setListItem(result);
            console.log("Retrieved All:", result);
          },
          onError: error => console.error("GetAll Error:", error)
        }
      });
    }

    function count(key?: Key) {
      runCommand({
        type: "readonly",
        action: "count",
        args: [key],
        handleEvents: {
          onSuccess: result => console.log("Count:", result),
          onError: error => console.error("Count Error:", error)
        }
      });
    }

    function clear() {
      runCommand({
        type: "readwrite",
        action: "clear",
        args: [],
        handleEvents: {
          onSuccess: result => console.log("Cleared:", result),
          onError: error => console.error("Clear Error:", error)
        }
      });
    }

    function del(key: Key) {
      runCommand({
        type: "readwrite",
        action: "delete",
        args: [key],
        handleEvents: {
          onSuccess: result => console.log("Deleted:", result),
          onError: error => console.error("Delete Error:", error)
        }
      });
    }

		return {
			add,
			put,
			get,
			getAll,
			count,
			clear,
			del,
			item,
			listItem
		}
	}

	function deleteDatabase(eventHandler: {onSuccess: () => void, onError: () => void}) {
    if(database()) {
      database()!.close();
    }

    const request = indexedDB.deleteDatabase(name);

    request.onsuccess = () => {
      eventHandler.onSuccess();
    }

    request.onerror = () => {
      eventHandler.onError();
    };
  }

	onCleanup(() => database()?.close());

	return (
		<IndexedDBContext.Provider value={[useStore, deleteDatabase]}>
      {props.children}
		</IndexedDBContext.Provider>
	);
}

export const useIndexedDB = () => useContext(IndexedDBContext);