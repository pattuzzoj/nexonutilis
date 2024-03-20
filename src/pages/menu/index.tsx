import { Title, Text } from "components/typography";
import { For, Match, Show, Switch, createEffect } from "solid-js";
import { useLocation } from "@solidjs/router";
import { useData } from "context";
import { database } from "database";
import Icon from "components/icon";
import useSaved from "hooks/useSaved";
import useSwitch from "hooks/useSwitch";

export default function Home() {
  const {data, setData} = useData();
  const location = useLocation();
  const path = () => location.pathname;
  const map = new Map();

  (function setMap(items: any) {
    for (let index = 0; index < items.length; index++) {
      map.set(items[index].url, items[index]);

      if ("items" in items[index]) {
        setMap(items[index].items);
      }
    }
  })(database.items)

  createEffect(() => {
    setData("item", {
      type: "",
      mode: "",
      title: "",
      description: "",
      roadmap: "",
      doc: "",
      items: [],
      url: "",
      icon: ""
    });

    setData("currentItems", []);

    if (path() == "/") {
      setData("item", database);
    } else {
      setData("item", map.get(path()));

      const url = path().substring(1).split("/");
      let currentPath = "";

      for (let index = 0; index < url.length; index++) {
        currentPath += "/" + url[index];
        setData("currentItems", (path: any) => [...path, map.get(currentPath)]);
      }
    }
  })
  
  const [getSaved, addSaved, removeSaved] = useSaved();
  
  function test(url: string) {
    const list = JSON.parse(getSaved());
    
    for (let index = 0; index < list.length; index++) {
      if(list[index].url == url) {
        return true;
      }
    }
    
    return false;
  }
  
  const [copyNotification, setCopyNotification] = useSwitch("");
  
  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    
    setCopyNotification(url);
    
    setTimeout(() => setCopyNotification(""), 1000);
  }
  
  return (
    <div class="h-full w-full flex flex-col p-4">
      <div class="flex flex-col gap-8">
        <Switch>
          <Match when={data.item.mode == "card"}>
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-3">
                <img class="size-8 rounded-xl" src={data.item.icon} alt="" />
                <Title as="2" class="text-[#2c2c54] dark:text-white">{data.item.title}</Title>
              </div>
              <Text class="p-2 text-wrap text-ellipsis text-[#2c2c54] dark:text-white">{data.item.description}</Text>
              <span class="flex gap-2">
                <Show when={data.item?.roadmap}><a class="text-center flex justify-center items-center gap-2 rounded-xl p-2 border-2 text-white dark:text-[#2c2c54] bg-[#2c2c54] dark:bg-white" href={data.item.roadmap}><Icon name="FiMap" class="size-4"/> Roadmap</a></Show>
                <Show when={data.item?.official}><a class="text-center flex justify-center items-center gap-2 rounded-xl p-2 border-2 text-white dark:text-[#2c2c54] bg-[#2c2c54] dark:bg-white" href={data.item.official}><Icon name="BiRegularBookBookmark" class="size-4"/>Official</a></Show>
              </span>
            </div>
            {/* <div class="w-full lg:w-1/4 flex flex-col items-center gap-2 border-2 border-dark bg-[#2c2c54] dark:bg-[#414066] rounded-xl h-fit p-5">
              <img class="size-20 rounded-xl" src={data.item.icon} alt="" />
              <Title as="4" class="text-white">{data.item.title}</Title>
              <Text class="p-2 text-wrap text-ellipsis text-white">{data.item.description}</Text>
              <span class="flex gap-6 w-full">
                <Show when={data.item?.roadmap}><a class="w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 border-2 text-black bg-white" href={data.item.roadmap}><Icon name="FiMap" class="size-4"/> Roadmap</a></Show>
                <Show when={data.item?.official}><a class="w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 border-2 text-black bg-white" href={data.item.official}><Icon name="BiRegularBookBookmark" class="size-4"/>Official</a></Show>
              </span>
            </div> */}
          </Match>
        </Switch>
        <Switch>
          <Match when={data.item.type == "categories"}>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-5 lg:gap-8">
              <For each={data.item.items}>
                {(item) => (
                  <a class="w-full flex flex-col justify-center items-start gap-1 rounded-xl p-4 bg-[#2c2c54] dark:bg-[#414066] hover:scale-105 group h-32" href={item.url}>
                    <span class="flex justify-between w-full">
                      <Title as="5" class="text-white">
                        {item.title}
                      </Title>
                      <Icon name="RiArrowsArrowRightDoubleLine" class="invisible group-hover:visible text-white size-6"/>
                    </span>
                    <Text class="line-clamp-2 text-white">{item.description}</Text>
                  </a>
                )}
              </For>
            </div>
          </Match>
          <Match when={data.item.type == "resources"}>
            <div class={`${data.item.icon ? "w-full sm:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"} grid gap-5 h-max`}>
              <For each={data.item.items}>
                {(item) => (
                  <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 bg-[#2c2c54] dark:bg-[#414066]">
                    <span class="flex justify-between w-full text-white">
                      <Title as="4" class="text-white">
                        {item.title}
                      </Title>
                      <span class="group hover:scale-110">
                        <Show when={test(item.url)} fallback={(
                          <>
                            <button onClick={() => addSaved(item)}><Icon name="BsBookmarkPlus" class="size-6 group-hover:hidden"/></button>
                            <button onClick={() => addSaved(item)}><Icon name="BsBookmarkPlusFill" class="size-6 hidden group-hover:block"/></button>
                          </>
                        )}>
                          <button onClick={() => removeSaved(item.url)}>
                            <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                            <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                          </button>
                        </Show>
                      </span>
                    </span>
                    <Text class="h-full text-white">{item.description}</Text>
                    <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                      <button onClick={() => copy(item.url)} class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-white hover:text-[#2c2c54] hover:bg-white">{(copyNotification() == item.url)? <>Copied Successfully <Icon name="BiSolidCopy" class="size-4"/></> : <>Copy<Icon name="OcCopy2" class="group-hover:scale-110 size-4"/></>}</button>
                      <a class="group md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-[#2c2c54] bg-white" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="group-hover:scale-110 size-4"/></a>
                    </span>
                  </div>
                )}
              </For>
            </div>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
