import { createMemo } from "solid-js";
import useLocalStorage from "./useLocalStorage";

export default function useSaved(): any {
  const [savedList, setSavedList] = useLocalStorage<any>("saved", JSON.stringify([]));

  const addItem = (item: any) => setSavedList(JSON.stringify([item, ...JSON.parse(savedList())]));
  
  const removeItem = (url: string) => {
    const list = JSON.parse(savedList());
    let indexItem = null;

    for (let index = 0; index < list.length; index++) {
      if(list[index].url == url) {
        indexItem = index;

        break;
      }
    }

    list.splice(indexItem, 1);
    setSavedList(JSON.stringify(list));
  }

  const savedItems = createMemo(() => JSON.parse(savedList()));

  return [savedItems, addItem, removeItem];
}