import { Title, Text } from "components/typography";
import { For, Match, Show, Switch, createEffect, createSignal } from "solid-js";
import { useData } from "context";
import Icon from "components/icon";
import useSaved from "hooks/useSaved";
import Main from "layout/main";
import {copy, copyNotification} from "utils/clipboard";

export default function Home() {
  const {data} = useData();
  const [savedItems, addItem, removeItem] = useSaved();
  const [title, setTitle] = createSignal(data.item.title);
  
  let card;

  createEffect(() => {
    if(data.item.title != title()) {
      setTimeout(() => setTitle(data.item.title), 50)
    }
  })

  return (
    <Main class="rounded-s-2xl text-gray-900 dark:text-white
    bg-gray-300 dark:bg-zinc-900">
          {/* <Show when={data.item.mode == "card"}>
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3">
                <img class="w-8 rounded-xl" src={data.item.logo} alt="" />
                <Title as="2" class="text-[#2c2c54] dark:text-white">{data.item.title}</Title>
              </div>
              <Text class="p-2 text-wrap text-ellipsis text-[#2c2c54] dark:text-white">{data.item.description}</Text>
              <span class="flex gap-2">
                <Show when={data.item.official}><a class="text-center flex justify-center items-center gap-2 rounded-xl p-2 text-white bg-gray-500" target="_blank" href={data.item.official}><Icon name="BiRegularBookBookmark" class="size-4"/>Official</a></Show>
                <Show when={data.item.roadmap}><a class="text-center flex justify-center items-center gap-2 rounded-xl p-2 text-white bg-gray-500" target="_blank" href={data.item.roadmap}><Icon name="FiMap" class="size-4"/> Roadmap</a></Show>
              </span>
            </div>
          </Show> */}
      <Switch>
        <Match when={data.item?.type == "resource"}>
          <div class="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4 h-max">
            <For each={data.item?.items}>
              {(item) => (
                <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 bg-gray-200 dark:bg-zinc-800 shadow-sm shadow-gray-300 dark:shadow-zinc-950">
                  <span class="flex justify-between w-full">
                    <Title as="4">
                      {item.title}
                    </Title>
                    <span class="group hover:scale-110 text-white hover:text-gray-400">
                      <Show when={savedItems().find((savedItem: any) => savedItem.url == item.url)} fallback={(
                        <>
                          <button onClick={() => addItem(item)}><Icon name="BsBookmarkPlus" class="size-6 group-hover:hidden"/></button>
                          <button onClick={() => addItem(item)}><Icon name="BsBookmarkPlusFill" class="size-6 hidden group-hover:block"/></button>
                        </>
                      )}>
                        <button onClick={() => removeItem(item.url)}>
                          <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                          <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                        </button>
                      </Show>
                    </span>
                  </span>
                  <Text class="text-base font-medium font-sans">{item.description}</Text>
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
        </Match>
        <Match when={data.item?.type == "category"}>
          <div ref={card} class="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 grid-rows-1 gap-4 transition-all duration-300">
            <For each={data.item?.items}>
              {(item) => (
                <a class="
                group w-full flex flex-col justify-between gap-4 rounded-2xl p-4 
                bg-gray-200 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700
                shadow-sm hover:shadow-lg shadow-gray-300 dark:shadow-zinc-950
                hover:scale-95 transition-transform duration-300" href={item.url}>
                  <span class="flex justify-between">
                    <Title as="3" class="text-xl">{item.title}</Title>
                    <Icon name="RiArrowsArrowRightDoubleLine" class="invisible group-hover:visible size-7"/>
                  </span>
                  <Text class="text-base font-medium font-sans line-clamp-2 opacity-90">{item.description}</Text>
                  <Show when={item?.icon}>
                    <span class="w-full flex flex-row-reverse">
                      <Icon name={item.icon} class="size-6 group-hover:animate-spin"/>
                    </span>
                  </Show>
                </a>
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </Main>
  );
}
