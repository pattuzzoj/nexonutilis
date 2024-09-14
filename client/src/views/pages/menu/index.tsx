import { Switch, Match, For, Show, } from "solid-js";
import Icon from "components/ui/icon";
import { useData } from "context/DataContext";
import useSaved from "hooks/useSaved";

function Menu() {
  const [data] = useData();
  const [savedItems, addItem, {removeItem}] = useSaved();

  return (
    <Switch>
      <Match when={data.item?.type == "category"}>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 transition-all duration-300">
          <For each={data.item?.items}>
            {(item) => (
              <a
              class="
              group w-full flex flex-col justify-between gap-4 rounded-2xl p-4 
              bg-gray-200 dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700
              shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950
              hover:scale-95 transition-all duration-300
              "
              href={item.url}
              >
                <span class="flex justify-between">
                  <h3 class="text-xl">{item.title}</h3>
                  <Icon name="RiArrowsArrowRightDoubleLine" class="opacity-0 group-hover:opacity-100 transition-all size-7"/>
                </span>
                <p class="text-base font-medium font-sans line-clamp-3 opacity-90">{item.description}</p>
                <Show when={item?.icon}>
                  <Icon name={item?.icon} class="w-full flex flex-row-reverse size-6"/>
                </Show>
              </a>
            )}
          </For>
        </div>
      </Match>
      <Match when={data.item?.type == "resource"}>
        <div class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-4 transition-all duration-300">
          <For each={data.item?.items}>
            {(item) => (
              <div
              class="
              group w-full flex flex-col justify-between gap-5 rounded-2xl p-4 
              bg-gray-200 dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700
              shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950
              hover:scale-95 transition-all duration-300
              "
              >
                <span class="flex justify-between">
                  <h3 class="text-xl">{item.title}</h3>
                  <span class="group hover:scale-110 text-black dark:text-white">
                    <Show when={savedItems().find((savedItem: any) => savedItem.url == item.url)} fallback={(
                      <>
                        <button onClick={() => addItem({title: item.title, description: item.description, url: item.url})}><Icon name="BsBookmarkPlus" class="size-6 group-hover:hidden"/></button>
                        <button onClick={() => addItem({title: item.title, description: item.description, url: item.url})}><Icon name="BsBookmarkPlusFill" class="size-6 hidden group-hover:block"/></button>
                      </>
                    )}>
                      <button onClick={() => removeItem(item.url)}>
                        <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                        <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                      </button>
                    </Show>
                  </span>
                </span>
                <p class="text-base font-medium font-sans line-clamp-3 opacity-90">{item.description}</p>
                <span class="flex flex-row-reverse gap-2 md:gap-4 w-full">
                  <button class="group flex justify-center items-center gap-2 rounded-xl p-2 text-black dark:text-white">
                    <Icon name="OcCopy2" class="size-4"/>
                  </button>
                </span>
              </div>
            )}
          </For>  
        </div>
      </Match>
    </Switch>
  );
}

export default Menu;