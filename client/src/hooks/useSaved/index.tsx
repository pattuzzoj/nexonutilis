import { Accessor } from "solid-js";
import useLocalStorage from "hooks/revision/useLocalStorage";

type useSavedReturn<T> = [
  Accessor<Array<T>>,
  (item: T) => void,
  {
    removeItem: (url: string) => void
  }
];

function useSaved<T>(): useSavedReturn<T> {
  const [savedList, setSavedList] = useLocalStorage<Array<T>>("saved", []);
  const addItem = (item: T) => setSavedList([...savedList(), item]);

  const removeItem = (url: string) => {
    const list: Array<T> = savedList();

    for (let index = 0; index < list.length; index++) {
      if((list[index] as T & {url: string}).url == url) {
        list.splice(index, 1);

        break;
      }
    }
    setSavedList(list);
  }

  return [
    savedList,
    addItem,
    {
      removeItem
    }
  ]
}

export default useSaved;