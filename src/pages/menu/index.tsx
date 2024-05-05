import { Title, Text } from "components/typography";
import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { useData } from "context";
import Icon from "components/icon";
import useSaved from "hooks/useSaved";
import {copy, copyNotification} from "utils/clipboard";
import { Category } from "models/interfaces/category";

export default function Home() {
  const {data} = useData();
  const [savedItems, addItem, removeItem] = useSaved();
  const [title, setTitle] = createSignal(data.item.title);
  const [currentPage, setCurrentPage] = createSignal(1);
  const quantity = document.documentElement.clientWidth > 1200 ? 9 : 4;

  createEffect(() => {
    if(data.item.title != title()) {
      setCurrentPage(1);
      setTimeout(() => setTitle(data.item.title), 50);
    }
  })

  return (
    <>
      <Switch>
        <Match when={data.item?.type == "resource"}>
          <div class="md:h-full flex flex-col justify-around gap-4">
            <div>
              <Title as="2" class="text-2xl">{data.item.title}</Title>
              <br />
              <Text>{data.item.description}</Text>
            </div>
            <div class="md:h-full flex flex-col justify-start">
              <div class="w-full grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 h-max">
                <For each={data.item?.items.slice(quantity * (currentPage() - 1), quantity * currentPage())} fallback={<div class="w-full h-full flex justify-center items-center text-2xl">The category doesn't have any features yet.</div>}>
                  {({title, description, url}) => (
                    <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 bg-gray-200 dark:bg-zinc-800 shadow-sm shadow-gray-300 dark:shadow-zinc-950">
                      <span class="flex justify-between w-full">
                        <Title as="4">
                          {title}
                        </Title>
                        <span class="group hover:scale-110 text-black dark:text-white">
                          <Show when={savedItems().find((savedItem: any) => savedItem.url == url)} fallback={(
                            <>
                              <button onClick={() => addItem({title, description, url})}><Icon name="BsBookmarkPlus" class="size-6 group-hover:hidden"/></button>
                              <button onClick={() => addItem({title, description, url})}><Icon name="BsBookmarkPlusFill" class="size-6 hidden group-hover:block"/></button>
                            </>
                          )}>
                            <button onClick={() => removeItem(url)}>
                              <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                              <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                            </button>
                          </Show>
                        </span>
                      </span>
                      <Text class="text-base font-medium font-sans line-clamp-3">{description}</Text>
                      <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                        <button onClick={() => copy(url)} class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-black dark:text-white bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
                    shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950">{(copyNotification() == url)? <>Copied Successfully <Icon name="BiSolidCopy" class="size-4"/></> : <>Copy<Icon name="OcCopy2" class="group-hover:scale-110 size-4"/></>}</button>
                        <a class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-black dark:text-white bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
                    shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950" target="_blank" href={url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
                      </span>
                    </div>
                  )}
                </For>
              </div>
            </div>
            <Show when={data.item?.items.length > quantity}>
              <div class="flex justify-center gap-2">
                <button class="rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700" onClick={() => setCurrentPage(currentPage() == 1 ? 1 : currentPage() - 1)}>
                  <Icon name="RiArrowsArrowLeftSLine" class="text-xl" />
                </button>
                <For each={new Array(Math.ceil(data.item?.items.length / quantity))}>
                  {(_item, index) => (
                    <button onClick={() => setCurrentPage(index() + 1)} class={`${currentPage() == index() + 1 ? "bg-gray-100 dark:bg-zinc-700" : ""} h-8 w-8 flex items-center justify-center rounded-xl p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700`}>{index() + 1}</button>
                  )}
                </For>
                <button class="rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700" onClick={() => setCurrentPage(Math.ceil(data.item?.items.length / quantity) == currentPage() ? Math.ceil(data.item?.items.length / quantity) : currentPage() + 1)}>
                  <Icon name="RiArrowsArrowRightSLine" class="text-xl" />
                </button>
              </div>
            </Show>
          </div>
        </Match>
        <Match when={data.item?.type == "category"}>
          <div class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 grid-rows-1 gap-4 transition-all duration-300">
            <For each={data.item?.items as Array<Category>} fallback={<div class="w-full h-full flex justify-center items-center text-2xl">The category doesn't have any features yet.</div>}>
              {({title, description, url, icon}) => (
                <a class="
                group w-full flex flex-col justify-between gap-4 rounded-2xl p-4 
                bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
                shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950
                hover:scale-95 transition-transform duration-300" href={url}>
                  <span class="flex justify-between">
                    <Title as="3" class="text-xl">{title}</Title>
                    <Icon name="RiArrowsArrowRightDoubleLine" class="invisible group-hover:visible size-7"/>
                  </span>
                  <Text class="text-base font-medium font-sans line-clamp-3 opacity-90">{description}</Text>
                  <Show when={icon}>
                    <span class="w-full flex flex-row-reverse">
                      <Icon name={icon} class="size-6 group-hover:animate-spin"/>
                    </span>
                  </Show>
                </a>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </>
  );
}
