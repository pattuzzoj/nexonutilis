import { Show, For } from "solid-js";
import { useIndexedDB } from "context/IndexedDB";
import {copy, copyNotification} from "utils/clipboard";
import Icon from "components/ui/icon";

function Favorites() {
  const [useStore] = useIndexedDB();
  const [favoriteData, favoriteStore] = useStore("favorite");

  return (
    <Show when={favoriteData()?.length} fallback={<p class="flex justify-center items-center text-2xl">Your favorite items will appear here.</p>}>
      <div class="h-max grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <For each={favoriteData()}>
          {(item) => (
            <div
            class="
            flex flex-col justify-between gap-4 rounded-2xl p-4 
            bg-primary
            "
            >
              <Show when={item.favorite}>
                <a class="flex justify-between items-center rounded-xl p-2 text-sm hover:bg-gray-100 hover:bg-hover" href={item.url}>{item.category}</a>
              </Show>
              <span class="flex justify-between">
                <h3 class="flex flex-col text-xl">{item.title}</h3>
                <span class="flex items-center text-black dark:text-white">
                  <Show when={favoriteData().find((savedItem: any) => savedItem.id == item.id)} fallback={(
                    <button class="group rounded-xl p-2 hover:scale-90 hover:text-hover hover:bg-hover" onClick={() => {favoriteStore.add({...item}); favoriteStore.getAll();}}>
                      <Icon name="BsBookmarkPlus" class="group-hover:hidden size-5"/>
                      <Icon name="BsBookmarkPlusFill" class="hidden group-hover:block size-5"/>
                    </button>
                  )}>
                    <button class="group rounded-xl p-2 hover:scale-90 hover:text-hover hover:bg-hover" onClick={() => {favoriteStore.del(item.id); favoriteStore.getAll()}}>
                      <Icon name="BsBookmarkCheckFill" class="group-hover:hidden size-5"/>
                      <Icon name="BsBookmarkDash" class="hidden group-hover:block size-5"/>
                    </button>
                  </Show>
                  <button class="rounded-xl p-2 hover:scale-90 hover:text-hover hover:bg-hover" onClick={() => copy(item.url)}>
                    <Show when={copyNotification() == item.url} fallback={<Icon name="OcCopy2" class="size-5"/>}>
                      <Icon name="BiSolidCopy" class="size-5"/>
                    </Show>
                  </button>
                </span>
              </span>
              <p class="text-normal font-medium line-clamp-4 opacity-90">{item.description}</p>
              <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                <a class="group w-full flex justify-center items-center gap-2 rounded-2xl py-2
                shadow-sm shadow-blue-200/20 dark:hover:shadow-blue-200 hover:text-hover bg-primary hover:bg-hover hover:scale-90" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
              </span>
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}

export default Favorites;