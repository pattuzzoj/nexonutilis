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

  function setMenu(menu: any) {
    for (let index = 0; index < menu.length; index++) {
      if (path().startsWith(menu[index].url)) {
        if (path() == menu[index].url) {
          setData("currentItems", (oldItems: any) => [...oldItems, menu[index]]);
          setData("item", menu[index]);
        } else {
          setData("currentItems", (oldItems: any) => [...oldItems, menu[index]]);
          setMenu(menu[index].items);
        }
        
        break;
      }
    }
  }
  
  createEffect(() => {
    setData("item", {
      type: "",
      title: "",
      description: "",
      roadmap: "",
      doc: "",
      items: [],
      url: "",
      icon: ""
    });

    if(path() != "/") {
      setData("currentItems", []);
      setMenu(database.items);
    } else {
      setData("item", database);
    }
  });
  
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
  
  const [copyNotification, setCopyNotification] = useSwitch("")
  
  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    
    setCopyNotification(url);
    
    setTimeout(() => setCopyNotification(""), 1000);
  }
  
  return (
    <div class="w-full flex flex-col">
      <Show when={path() != "/"}>
        <span class="flex items-center gap-2 mb-5 md:mb-5 lg:mb-8">
          <a class="p-2 text-white dark:text-black hover:text-white bg-dark dark:bg-white hover:bg-purple rounded-md" href="/">Home</a>
          <For each={data.currentItems}>
            {(item) => <><span class="font-bold text-xl">/</span><a class="p-2 text-white dark:text-black hover:text-white bg-dark dark:bg-white hover:bg-purple rounded-md" href={item.url}>{item.title}</a></>}
          </For>
        </span>
      </Show>
      <div class="flex flex-col lg:flex-row gap-8">
        <Show when={data.item?.icon}>
          <div class="w-full lg:w-1/4 flex flex-col items-center gap-2 border-2 border-dark dark:bg-gray-700/20 rounded-xl h-fit p-5">
            <img class="size-20 rounded-xl" src={data.item.icon} alt="" />
            <Title as="4">{data.item.title}</Title>
            <Text class="text-wrap text-ellipsis p-2">{data.item.description}</Text>
            <span class="flex gap-6 w-full">
              <Show when={data.item?.roadmap}><a class="w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 border-2 text-white dark:text-black bg-dark dark:bg-white" href={data.item.roadmap}><Icon name="FiMap" class="size-4"/> Roadmap</a></Show>
              <Show when={data.item?.site}><a class="w-full text-center flex justify-center items-center gap-2 rounded-xl p-2 border-2 text-white dark:text-black bg-dark dark:bg-white" href={data.item.doc}><Icon name="BiRegularBookBookmark" class="size-4"/>Official</a></Show>
            </span>
          </div>
        </Show>
        <Switch>
          <Match when={data.item.type == "category"}>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-5 lg:gap-8">
              <For each={data.item.items}>
                {(item) => (
                  <a class="w-full flex flex-col justify-center items-start gap-1 border-2 border-dark hover:border-purple rounded-xl p-4 dark:bg-gray-700/20 hover:scale-105 group h-32" href={item.url}>
                    <span class="flex justify-between w-full">
                      <Title as="6">
                        {item.title}
                      </Title>
                      <Icon name="RiArrowsArrowRightDoubleLine" class="invisible group-hover:visible text-purple size-6"/>
                    </span>
                    <Text class="line-clamp-2">{item.description}</Text>
                  </a>
                )}
              </For>
            </div>
          </Match>
          <Match when={data.item.type == "resources"}>
            <div class={`${data.item.icon ? "w-full lg:w-3/4 sm:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"} grid gap-5 lg:gap-8 h-max`}>
              <For each={data.item.items}>
                {(item) => (
                  <div class="flex flex-col justify-between gap-5 w-full rounded-xl p-4 border-2 border-dark hover:border-purple dark:bg-gray-700/20">
                    <span class="flex justify-between w-full">
                      <Title as="6">
                        {item.title}
                      </Title>
                      <Show when={test(item.url)} fallback={
                        <button onClick={() => addSaved(item)}><Icon name="BsBookmarkPlus" class="hover:text-purple size-6 group-hover:hidden"/></button>
                      }>
                        <button class="group" onClick={() => removeSaved(item.url)}>
                          <Icon name="BsBookmarkCheckFill" class="size-6 group-hover:hidden"/>
                          <Icon name="BsBookmarkDash" class="size-6 hidden group-hover:block"/>
                        </button>
                      </Show>
                    </span>
                    <Text class="h-full">{item.description}</Text>
                    <span class="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                      <button onClick={() => copy(item.url)} class="md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-white dark:text-black bg-dark dark:bg-white">{(copyNotification() == item.url)? <>Copied Successfully <Icon name="BiSolidCopy" class="text-purple size-4"/></> : <>Copy<Icon name="OcCopy2" class="hover:text-purple size-4"/></>}</button>
                      <a class="md:w-6/12 flex justify-center items-center gap-2 rounded-xl p-2 text-white bg-purple" target="_blank" href={item.url}>Access <Icon name="OcLinkexternal2" class="hover:text-purple size-4"/></a>
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
