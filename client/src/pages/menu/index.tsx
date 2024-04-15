import { Title, Text } from "components/typography";
import { For, Match, Show, Switch } from "solid-js";
import { useData } from "context";
import Icon from "components/icon";
import useSaved from "hooks/useSaved";
import Main from "layout/main";
import {copy, copyNotification} from "utils/clipboard";

export default function Home() {
  const {data} = useData();
  const [savedItems, addItem, removeItem] = useSaved();

  return (
    <Main>
      <div class="flex flex-col gap-8">
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
            <div class="w-full md:grid-cols-2 lg:grid-cols-3 grid gap-5 h-max">
              <For each={data.item?.items}>
                {(item) => (
                  <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 bg-gray-300 dark:bg-gray-800">
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
                    <Text class="h-full">{item.description}</Text>
                    <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                      <button onClick={() => copy(item.url)} class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-white bg-gray-500 hover:bg-gray-400">{(copyNotification() == item.url)? <>Copied Successfully <Icon name="BiSolidCopy" class="size-4"/></> : <>Copy<Icon name="OcCopy2" class="group-hover:scale-110 size-4"/></>}</button>
                      <a class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-white bg-gray-500 hover:bg-gray-400" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
                    </span>
                  </div>
                )}
              </For>
            </div>
          </Match>
          <Match when={true}>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-5 md:gap-5">
              <For each={data.item?.items || new Array(8)}>
                {(item) => (
                  <a class="w-full flex flex-col justify-between items-start gap-1 rounded-xl p-4 bg-gray-300 dark:bg-gray-800 hover:scale-95 group" href={item?.url}>
                    <span class="flex justify-between w-full">
                      <Title as="5" class="flex items-center gap-2">
                        <Show when={item?.icon}>
                          <Icon name={item?.icon} class={`size-7 group-hover:animate-spin transition-transform duration-300`} />
                        </Show>
                        {item?.title}
                      </Title>
                      <Icon name="RiArrowsArrowRightDoubleLine" class="invisible group-hover:visible size-6"/>
                    </span>
                    <Text class="line-clamp-2">{item?.description}</Text>
                  </a>
                )}
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </Main>
  );
}
