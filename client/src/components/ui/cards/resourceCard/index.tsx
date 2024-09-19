import { Show } from "solid-js";
import Icon from "components/ui/icon";
import { useIndexedDB } from "context/IndexedDB";
import {copy, copyNotification} from "utils/clipboard";
import { Item } from "types/interfaces";

interface ResourceCardProps extends Item {
  category?: string;
  favorite?: boolean;
}

function ResourceCard(props: ResourceCardProps) {
  const [useStore] = useIndexedDB();
  const [favoriteData, favoriteStore] = useStore("favorite");
  
  return (
    <div
    class="
    flex flex-col justify-between gap-4 rounded-2xl p-4 
    bg-slate-200 dark:bg-zinc-800
    "
    >
      <Show when={props.favorite}>
        <a class="flex justify-between items-center rounded-xl p-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700" href={props.url}>{props.category}</a>
      </Show>
      <span class="flex justify-between">
        <h3 class="flex flex-col text-xl">{props.title}</h3>
        <span class="flex items-center text-black dark:text-white">
          <Show when={favoriteData().find((savedItem: any) => savedItem.id == props.id)} fallback={(
            <button class="group rounded-xl p-2 hover:scale-90 hover:bg-gray-50 dark:hover:bg-zinc-700" onClick={() => {favoriteStore.add({...props}); favoriteStore.getAll();}}>
              <Icon name="BsBookmarkPlus" class="group-hover:hidden size-5"/>
              <Icon name="BsBookmarkPlusFill" class="hidden group-hover:block size-5"/>
            </button>
          )}>
            <button class="group rounded-xl p-2 hover:scale-90 hover:bg-gray-50 dark:hover:bg-zinc-700" onClick={() => {favoriteStore.del(props.id); favoriteStore.getAll()}}>
              <Icon name="BsBookmarkCheckFill" class="group-hover:hidden size-5"/>
              <Icon name="BsBookmarkDash" class="hidden group-hover:block size-5"/>
            </button>
          </Show>
          <button class="group text-black dark:text-white rounded-xl p-2 hover:scale-90 hover:bg-gray-50 dark:hover:bg-zinc-700" onClick={() => copy(props.url)}>
            <Show when={copyNotification() == props.url} fallback={<Icon name="OcCopy2" class="size-5"/>}>
              <Icon name="BiSolidCopy" class="size-5"/>
            </Show>
          </button>
        </span>
      </span>
      <p class="text-normal font-medium line-clamp-4 opacity-90">{props.description}</p>
      <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
        <a class="group w-full flex justify-center items-center gap-2 rounded-2xl py-2
        text-black dark:text-white bg-gray-200 dark:bg-zinc-900 hover:scale-90" target="_blank" href={props.url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
      </span>
    </div>
  );
}

export default ResourceCard;