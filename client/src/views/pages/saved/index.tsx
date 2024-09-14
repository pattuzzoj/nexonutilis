import { Show, For } from "solid-js";
import Icon from "components/ui/icon";
import useSaved from "hooks/useSaved";
import {copy, copyNotification} from "utils/clipboard";

function Saved() {
  const [savedItems, _addItem, {removeItem}] = useSaved<{title: string, description: string, url: string}>();

  return (
    <Show when={savedItems()?.length} fallback={<p class="flex justify-center items-center text-2xl">Your saved items will appear here.</p>}>
      <div class="h-max grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <For each={savedItems()}>
          {(item) => (
            <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 bg-gray-200 dark:bg-zinc-800 shadow-sm shadow-gray-300 dark:shadow-zinc-950">
              <span class="flex justify-between w-full">
                <h4>
                  {item.title}
                </h4>
                <button class="group hover:scale-110 text-black dark:text-white" onClick={() => removeItem(item.url)}>
                  <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                  <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                </button>
              </span>
              <p class="text-base font-medium font-sans">{item.description}</p>
              <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                <button onClick={() => copy(item.url)} class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-black dark:text-white bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
            shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950">{(copyNotification() == item.url)? <>Copied Successfully <Icon name="BiSolidCopy" class="size-4"/></> : <>Copy<Icon name="OcCopy2" class="group-hover:scale-110 size-4"/></>}</button>
                <a class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-black dark:text-white bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
            shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
              </span>
            </div>
          )}
        </For>
      </div>
    </Show>
  )
}

export default Saved;